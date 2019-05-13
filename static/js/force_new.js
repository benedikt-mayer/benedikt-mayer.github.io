var baseNodes = []
var baseLinks = []

// check which radio button is selected on page start and fetch the data accordingly
$(function () {
  let checkvalue = $('input[type=radio][name=Force]:checked').val()
  fetchAsyncForce(`${checkvalue}`);
});

// check which radio button is selected currently / changed and fetch the data accordingly
$('input[type=radio][name=Force]').on('change', function () {
  fetchAsyncForce(`${$(this).val()}`);
});

// constants for the graph gravity
const force_many_body = -1000
const strength_scaling = 10

// fetch the data from the server and then call the d3 function to display the data
async function fetchAsyncForce(url) {
  data = jsonData[url];

  width = $("#force-directed").parent().width()
  height = width / 2;

  // group the data according to the newspaper
  let newspaper_lists = data.reduce((newspaper_aggregated, element) => {
    if (!newspaper_aggregated[element.newsportal]) {
      newspaper_aggregated[element.newsportal] = [];
    }
    if (!Object.values(newspaper_aggregated).some(newspaper_collection => newspaper_collection.some(existing_element => existing_element.title == element.title))) {
      newspaper_aggregated[element.newsportal].push({
        results: element.results,
        title: element.title,
        newsportal: element.newsportal
      });
    }
    return newspaper_aggregated;
  }, {});

  // now take only the first 15 entries per newspaper
  Object.entries(newspaper_lists).forEach(([newspaper_list_key, newspaper_list_value]) =>
    newspaper_lists[newspaper_list_key] = newspaper_list_value.slice(0, 15)
  )

  // sum up the data per newspaper
  let summed_newspaper_data = Object.keys(newspaper_lists).map(newsportal => {
    return [
      newsportal, newspaper_lists[newsportal].reduce((sum, element, resultsIndex) => {
        let results = element.results
        Object.keys(results).map(resultKey => {
          if (!sum[resultKey]) {
            sum[resultKey] = results[resultKey].percentile / 100
          } else {
            sum[resultKey] = ((sum[resultKey] * resultsIndex) + (results[resultKey].percentile / 100)) / (resultsIndex + 1)
          }
        })
        return sum;
      }, {})
    ]
  })

  // create the newspaper_links according to the summed_newspaper_data
  let newspaper_links = []
  summed_newspaper_data.forEach(source_newspaper_array => {
    let source_newspaper_name = source_newspaper_array[0]
    let source_newspaper_values = source_newspaper_array[1]

    summed_newspaper_data.forEach(target_newspaper_array => {
      let target_newspaper_name = target_newspaper_array[0]
      let target_newspaper_values = target_newspaper_array[1]

      if (source_newspaper_name != target_newspaper_name) {

        let distances = Object.keys(source_newspaper_values).map(result_key => {
          return Math.abs(source_newspaper_values[result_key] - target_newspaper_values[result_key])
        })

        let strength_value = Math.hypot(distances[0], distances[1], distances[2], distances[3], distances[4], distances[5], distances[6], distances[7], distances[8], distances[9])

        newspaper_links.push({
          target: target_newspaper_name,
          source: source_newspaper_name,
          strength: 1 - strength_value
        })
      }

    })
  })

  // get the maximum and minimum strength values for normalization
  let strength_max = newspaper_links.reduce((max, value) => {
    if (value.strength > max) {
      return value.strength
    } else {
      return max
    }
  }, 0.0)
  let strength_min = newspaper_links.reduce((min, value) => {
    if (value.strength < min) {
      return value.strength
    } else {
      return min
    }
  }, 1.0)

  // now normalize the data
  newspaper_links = newspaper_links.map(element => {
    return {
      target: element.target,
      source: element.source,
      strength: ((element.strength - strength_min) / (strength_max - strength_min)) / strength_scaling
    }
  })

  // if we want to use the individual articles, merge them into one list
  let filtered_articles = Object.keys(newspaper_lists).reduce((accumulator, newspaper_key) => {
    return [...accumulator, ...newspaper_lists[newspaper_key]]
  }, [])

  // get all individual newsportals
  let newspapers = Object.keys(newspaper_lists)

  // now construct the base nodes from the newsportals
  newspaper_base_nodes = []
  newspapers.forEach(newspaper => {
    newspaper_base_nodes.push({
      id: newspaper,
      group: newspapers.indexOf(newspaper),
      label: newspaper,
      level: 1,
      results: summed_newspaper_data.find(newspaper_element => newspaper_element[0] == newspaper)[1]
    })
  })
  // set the baseNodes and nodes
  baseNodes = newspaper_base_nodes;
  baseLinks = newspaper_links;
  nodes = [...baseNodes]
  links = [...baseLinks]
  // now call the d3 function
  updateSimulation()
}


function getNeighbors(node) {
  return baseLinks.reduce(function (neighbors, link) {
      if (link.target.id === node.id) {
        neighbors.push(link.source.id)
      } else if (link.source.id === node.id) {
        neighbors.push(link.target.id)
      }
      return neighbors
    },
    [node.id]
  )
}

function isNeighborLink(node, link) {
  return link.target.id === node.id || link.source.id === node.id
}

function getNodeColor(node, neighbors) {
  if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
    return node.level === 1 ? 'blue' : 'green'
  }
  return node.level === 1 ? 'red' : 'gray'
}

function getLinkColor(node, link) {
  return isNeighborLink(node, link) ? 'green' : '#E5E5E5'
}

function getTextColor(node, neighbors) {
  return 'black'
}
// var width = window.innerWidth * 0.9
// var height = window.innerHeight * 0.9
var svg = d3.select('#force-directed')
var width = $("#force-directed").parent().width()
var height = width / 2
svg.attr('width', width).attr('height', height)
var linkElements,
  nodeElements,
  textElements

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// we use svg groups to logically group the elements together
var linkGroup = svg.append('g').attr('class', 'links')
var nodeGroup = svg.append('g').attr('class', 'nodes')
var textGroup = svg.append('g').attr('class', 'texts')
// we use this reference to select/deselect
// after clicking the same element twice
var selectedId
// simulation setup with all forces
var linkForce = d3
  .forceLink()
  .id(function (link) {
    return link.id
  })
  .strength(function (link) {
    return link.strength
  })
var simulation = d3
  .forceSimulation()
  .force('link', linkForce)
  .force('charge', d3.forceManyBody().strength(force_many_body))
  .force('center', d3.forceCenter(width / 2, height / 2))
var dragDrop = d3.drag().on('start', function (node) {
  node.fx = node.x
  node.fy = node.y
}).on('drag', function (node) {
  simulation.alphaTarget(0.7).restart()
  node.fx = d3.event.x
  node.fy = d3.event.y
}).on('end', function (node) {
  if (!d3.event.active) {
    simulation.alphaTarget(0)
  }
  node.fx = null
  node.fy = null
})
// select node is called on every click
// we either update the data according to the selection
// or reset the data if the same node is clicked twice
function selectNode(selectedNode) {
  if (selectedId === selectedNode.id) {
    selectedId = undefined
    resetData()
    updateSimulation()
  } else {
    selectedId = selectedNode.id
    updateData(selectedNode)
    updateSimulation()
  }
  var neighbors = getNeighbors(selectedNode)
  // we modify the styles to highlight selected nodes
  nodeElements.attr('fill', function (node) {
    return getNodeColor(node, neighbors)
  })
  textElements.attr('fill', function (node) {
    return getTextColor(node, neighbors)
  })
  linkElements.attr('stroke', function (link) {
    return getLinkColor(selectedNode, link)
  })
}
// this helper simple adds all nodes and links
// that are missing, to recreate the initial state
function resetData() {
  var nodeIds = nodes.map(function (node) {
    return node.id
  })
  baseNodes.forEach(function (node) {
    if (nodeIds.indexOf(node.id) === -1) {
      nodes.push(node)
    }
  })
  links = baseLinks
}
// diffing and mutating the data
function updateData(selectedNode) {
  var neighbors = getNeighbors(selectedNode)
  var newNodes = baseNodes.filter(function (node) {
    return neighbors.indexOf(node.id) > -1 || node.level === 1
  })
  var diff = {
    removed: nodes.filter(function (node) {
      return newNodes.indexOf(node) === -1
    }),
    added: newNodes.filter(function (node) {
      return nodes.indexOf(node) === -1
    })
  }
  diff.removed.forEach(function (node) {
    nodes.splice(nodes.indexOf(node), 1)
  })
  diff.added.forEach(function (node) {
    nodes.push(node)
  })
  links = baseLinks.filter(function (link) {
    return link.target.id === selectedNode.id || link.source.id === selectedNode.id
  })
}

function updateGraph() {
  // links
  linkElements = linkGroup.selectAll('line')
    .data(links, function (link) {
      return link.target.id + link.source.id
    })
  linkElements.exit().remove()
  var linkEnter = linkElements
    .enter().append('line')
    .attr('stroke-width', 2)
    .attr('stroke', 'rgba(50, 50, 50, 0.2)')
  linkElements = linkEnter.merge(linkElements)
  // nodes
  nodeElements = nodeGroup.selectAll('circle')
    .data(nodes, function (node) {
      return node.id
    })
  nodeElements.exit().remove()
  var nodeEnter = nodeElements
    .enter()
    .append('circle')
    .attr('r', 15)
    .attr('fill', function (node) {
      return node.level === 1 ? 'blue' : 'gray'
    })
    .call(dragDrop)
    // we link the selectNode method here
    // to update the graph on every click
    .on('click', selectNode)
    .on("mouseover", function (node) {
      tooltip.transition()
        .duration(200)
        .style("opacity", 1);
      tooltip.html("<b>Newsportal:</b> " + node.id + "<br><br>" + Object.keys(node.results).map(result_key => "<b>" + result_key + "</b>: " + node.results[result_key].toString().substr(0, 5) + "<br>").reduce((acc, value) => acc + value))
        .style("left", (d3.event.pageX + 60) + "px")
        .style("top", (d3.event.pageY - 200) + "px")
        .style("border", "1px solid black")
        .style("border-radius", "4px")
        .style("padding", "0.8rem")
        .style("height", "fit-content")
        .style("background-color", "white");
    })
    .on("mouseout", function (d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });
  nodeElements = nodeEnter.merge(nodeElements)
  // texts
  textElements = textGroup.selectAll('text')
    .data(nodes, function (node) {
      return node.id
    })
  textElements.exit().remove()
  var textEnter = textElements
    .enter()
    .append('text')
    .text(function (node) {
      return node.label
    })
    .attr('font-size', 15)
    .attr('dx', 20)
    .attr('dy', 4)
  textElements = textEnter.merge(textElements)
}



function updateSimulation() {

  let radius = 6;
  updateGraph()
  simulation.nodes(nodes).on('tick', () => {
    nodeElements.attr("cx", function (d) {
        return d.x = Math.max(radius, Math.min(width - radius, d.x));
      })
      .attr("cy", function (d) {
        return d.y = Math.max(radius, Math.min(height - radius, d.y));
      });
    textElements.attr("x", function (d) {
        return d.x = Math.max(radius, Math.min(width - radius, d.x));
      })
      .attr("y", function (d) {
        return d.y = Math.max(radius, Math.min(height - radius, d.y));
      });

    linkElements.attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });
  })
  simulation.force('link').links(links)
  simulation.alphaTarget(0.7).restart()
}