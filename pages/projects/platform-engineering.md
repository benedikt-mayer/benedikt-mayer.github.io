---
project_title: Platform Engineering
project_description: A UX perspective on building great platforms.
project_image: lu_hbf_4_3.jpg
project_image_alt_text: A picture of Ludwigshafen's main station in the fifties.
slug: platform-engineering
---

::: article
::: paragraph
::: text
## Why you should care about development containers

&nbsp;

When someone new joins your project team, how long do they need until every tool is installed and they can run code on their development machine?

&nbsp;

How much do the development setups of your different engineers differ?
How long is your setup guide documentation?

&nbsp;

“Works on my machine” is less of a problem these days if the application you’re developing is containerized.
But what about the tools and configurations you need to develop your application which live outside of your application container?

:::
::: image
![A screenshot of a terminal installing tools, in this case cowsay.](../static/img/cowsay.png)\

::: caption
Installing tools during onboarding can be a pain.
:::
:::
:::

::: paragraph
::: image
![A marketing image from GitHub showing a code editor in the browser as well as features of GitHub codespaces like debugging and machines of up to 32 CPU cores and 64GB of memory.](../static/img/codespaces_social.jpg)\

::: caption
GitHub Codespaces shine through their many templates for different languages and setups.
:::
:::

::: text
## GitHub Codespaces

&nbsp;

What if you want to separate your development environment from your machine completely?

&nbsp;

With development containers, you can use the power of containerization for your whole setup: Configure one file and have developers spin up a container with everything preinstalled so that they can focus on what matters: Developing your product.

&nbsp;

GitHub has been a front runner in this domain with [GitHub Codespaces](https://github.com/features/codespaces): Combined with Visual Studio Code (in the browser or locally), you can open a fully featured IDE from any public GitHub repository by logging into GitHub and pressing “.”.

&nbsp;

To standardize these development container configurations, Microsoft has created an open specification at [Development containers](https://containers.dev/).

:::
:::

::: paragraph

::: text
## Alternatives

&nbsp;

Apart from Microsoft / GitHub, there are also other providers of similar services like [Coder](https://coder.com/), which we recently investigated at one of our customers as an option to improve their development setup.

&nbsp;

With Coder, you can set up development containers as terraform templates, which the developers can then invoke via a user-friendly web UI and then connect to from their favorite tool like Visual Studio Code.

&nbsp;

Coder, in contrast to GitHub Codespaces, is run on your own on-prem or public cloud infrastructure, so you can use it independently of where you’re hosting your code.

:::
::: image
![Placeholder alt text.](../static/img/coder.jpg)\

::: caption
Coder has a very usable self-service UI to provision dev containers.
:::
:::
:::
:::