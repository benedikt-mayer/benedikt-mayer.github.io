---
project_title: Smart display
project_description: Building useful side projects with GitHub Copilot.
project_image: smart_display_4_3.png
project_image_alt_text: A screenshot of the mvg terminal app next to the weather terminal app.
slug: smart-display
sub_header: smart display
published_date: 06.01.2026
published: 2026-01-06
---

::: article
::: paragraph
::: text
## What are side projects for?

&nbsp;

Side projects, at least for me, are a way to play around with something fun, without the risks and stressors of work.

&nbsp;

This can be coding of course, for example to build a personal website. I remember a time where I practiced online for weeks to improve in live coding interviews / tests (see: [benedikt-mayer/codingpractice](https://github.com/benedikt-mayer/codingpractice)).

&nbsp;

In general it's good to have some sort of purpose or goal, for example to build a nice site to show to people, learn a particular skill or give back to the open source community.

&nbsp;

Learning something just for the sake of learning something can be hard though: There are great online platforms for learning, but apart from some arbitrary badge of course completion, there is nothing to drive oneself towards the next step.

&nbsp;

One thing that always helps is if it solves some problem you have, since then, every step you take to take towards solving that problem feels like an achievement. The learning will be a nice side effect.

&nbsp;

This is also the case for another hobby of mine: Gardening. I tend to spend much more time on the gardening projects which result in rewards along the way. A healthy plant is nice, but fresh tomatoes and blueberries are nicer.

:::
::: image
![An image of a planter with many ripe blueberries.](../static/img/gardening.jpg)\

::: caption
A good side project feels like a fun hobby and optimally produces some useful output.
:::
:::
:::

::: paragraph
::: image
![An image a surface go tablet running two terminal applications: A public transport app on the left and a weather app on the right.](../static/img/first_version_smart_display.jpg)\

::: caption
The first version of my smart display, with the MVG Fahrinfo app next to wttr.in.
:::
:::

::: text
## Version 1: Take something from the internet, and adjust it

&nbsp;

So let's get to my oh-so-useful side project! 

&nbsp;

When I'm on my way out the door, there are three things I check almost every time:

1\. How late is it?  
2\. How much time do I have until my train or bus departs?  
3\. What's the weather?  

&nbsp;

Given I often get ready like a compiler: just in time, getting out the phone and checking how late my train is this time or whether I need gloves outside, can be a matter of life and death.

&nbsp;

So I thought: What if I had a little screen, to show me this information? I build software for a living, this shouldn't be that hard.

&nbsp;

Thus, I went on the internet and researched, how one could build something like this. My first thoughts went to screen connected to a raspberry pi (like [here](./radio.html)), but most of the internet recommended just buying a cheap tablet like a surface go instead, which is what I went for.

&nbsp;

Next, I needed to see how I can build this, and I found the nice [FaisalBinAhmed/MVGFahrinfo](https://github.com/FaisalBinAhmed/MVGFahrinfo) project on github and [wttr.in](http://wttr.in/) to display the weather in a terminal. With some tweaks in what information to display, I was pretty happy (see my [MVGFahrinfo fork](https://github.com/benedikt-mayer/MVGFahrinfo)).

&nbsp;

My energy for side projects was spent for now. I had learned something new about building terminal apps, a tiny bit of rust and (again) that you can never trust an API to be reliable.

:::
:::

::: paragraph

::: text
## Version 2: Refinements and building a new app for the weather

&nbsp;

But ultimately, the weather output from [wttr.in](http://wttr.in/) was just not close enough to what I needed: The formatting was fiddly, the API often returned errors and I needed more detail to make a good decision.

&nbsp;

So, weaponized with a free month of github copilot pro, I set out to create the best terminal user interface (TUI) for weather the world has ever seen!

&nbsp;

Given I was not out to learn a new language this time, I chose python with [textual](https://textual.textualize.io/) as a TUI framework. Textual turned out to be quite easy to work with, which was a great plus.

&nbsp;

Given the time constraints of a few hours per day for a few days, I chose to have copilot write most of the code. This choice of having copilot figure out textual of course greatly diminishes how much I will learn the framework.

&nbsp;

[In the words of Joel Spolsky](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/) *"[...] the abstractions save us time working, but they don’t save us time learning."*  
The motivation here was mainly to build something useful fast and less on the learning. One thing I definitively learned is how important a good `agents.md` file is, to rein in what copilot should (always run the formatter and tests) and shouldn't (just push when it thinks it's done) do.

&nbsp;

But it still feels weird to build something without learning about the underlying system thoroughly.

&nbsp;

To quote Joel Spolsky again: *"And all this means that paradoxically, even as we have higher and higher level programming tools with better and better abstractions, becoming a proficient programmer is getting harder and harder."* ([The Law of Leaky Abstractions
](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/)).

&nbsp;

With these philosophical words, here is the final result: [benedikt-mayer/weather-tui](https://github.com/benedikt-mayer/weather-tui). I'm quite happy with how it turned out, and even released it as a package on pypi: [weather-tui](https://pypi.org/project/weather-tui/).

&nbsp;

In the app, one can type in a place name (like "Munich"), and the app will:

1\. Look up the place name on [openweathermap.org](https://openweathermap.org/)'s API to get the corresponding latitude and longitude  
2\. Call [open-meteo.com](https://open-meteo.com/)'s API with those coordinates, which will deliver great, easily usable weather information  
3\. Display today's weather information in a graph as well as  
4\. Display a summary of the next days, which when clicked on shows the full information for that day  

&nbsp;

All it needs to run, is a free API key from [openweathermap.org](https://openweathermap.org/) and one can run the TUI by running:  

`uvx --refresh --with weather-tui python -m weather_tui`

&nbsp;

As a side side project, I have also made both of those initial steps into MCP servers ([lat-long-mcp-server](https://github.com/benedikt-mayer/lat-long-mcp-server) and [weather-mcp-server](https://github.com/benedikt-mayer/weather-mcp-server)) as well as built a small MCP client to call and test them ([mcp-client](https://github.com/benedikt-mayer/mcp-client)). For those, the learning was greater, the use is questionable.

:::
::: image
![An image of a tablet showing the public transport app again, this time next to the weather-tui app showing a summary of the current day as well as.](../static/img/second_version_smart_display.jpg)\

::: caption
The weather-tui app, mounted to the wall, next to the slightly improved MVGFahrinfo app.
:::
:::
:::
:::