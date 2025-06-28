---
project_title: Platform Engineering
project_description: What we can learn about building great platforms from UX and the city of Ludwigshafen.
project_image: lu_hbf_4_3.jpg
project_image_alt_text: A picture of Ludwigshafen's main station in the fifties.
slug: platform-engineering
sub_header: platform engineering
published: 01.07.2025
---

::: article
::: paragraph
::: text
## Why is everyone building a platform now?

&nbsp;

Reading online, if you manage to make it through the mound of AI/Agent/Copilot posts, a lot of people are talking about building platforms.  
I'm also guilty of this, having been part of ML, data and streaming platform teams in the last years.

&nbsp;

According to [wikipedia](https://en.wikipedia.org/wiki/Platform_engineering): „Platform engineering is a Software Engineering discipline focused on the development of self-service Toolchains, services, and processes to create an internal developer platform“.

&nbsp;

So platforms are not some super concrete thing, they are usually just something you write to be used by other engineers at your to help them build their products.  
Often, the purpose is to reduce reduntant work, simplify operations due to more coordinated tech stacks and improve the developer experience.

:::
::: image
![An image of literal platform boots, with many rainbow layers, taken from wikipedia: https://commons.wikimedia.org/wiki/File:LU_Hbf_Februar_1958.jpg.](../static/img/Rainbow-platforms.jpg)\

::: caption
Another example of platform engineering, image taken from [wikipedia](https://commons.wikimedia.org/wiki/File:Rainbow-platforms.jpg).
:::
:::
:::

::: paragraph
::: image
![An image of Ludwigshafen's main railway station from 1958, taken from wikipedia: https://commons.wikimedia.org/wiki/File:LU_Hbf_Februar_1958.jpg.](../static/img/lu_hbf.jpg)\

::: caption
An image of Ludwigshafen's old railway station from 1958, taken from [wikipedia](https://commons.wikimedia.org/wiki/File:LU_Hbf_Februar_1958.jpg).
:::
:::

::: text
## Lessons from Ludwigshafen's main railway station

&nbsp;

Having grown up in Ludwigshafen am Rhein, I grew up having a huge, impressive, ugly and mostly deserted railway station at the edge of our medium-sized city.  
It was built in 1969 to replace the existing station, which due to being a terminus, became impractical and outdated.  
Additionally, the rising city of Ludwigshafen wanted to have a representative station, part of it's plan of a modern city called [Projekt Visitenkarte](https://de.wikipedia.org/wiki/Projekt_Visitenkarte).

&nbsp;

So city planners and Deutsche Bahn went ahead and constructed a monumentally huge railway station with 12 platforms spread across three levels.  
For infrastructure reasons, as there were existing tracks and crossings at the desired location, the station was moved outside the city center.

&nbsp;

Unfortunately, since Mannheim, a much larger city, has it's railway station just 5 rail-minutes away, and since the new station was in the middle of nowhere, there wasn't much use for the station as it was built.  
Even according to Ludwigshafen's 1984 mayor Werner Ludwig, the station is an eyesore.

&nbsp;

So what can we learn for platform engineering?  
Just because something is practical for infrastructure reasons, it might not be what people need.  
Rivalries between departments can lead to competing platforms (e.g. Ludwigshafen vs Mannheim) which then have to be expensively consolidated later.

:::
:::

::: paragraph

::: text
## A look from the user experience (UX) perspective

&nbsp;

Just because a platform is built for engineers and internal, it doesn't mean one should expect them to all think and work like the platform engineers: You are not the user.  
Finding out who the product is targeting is one of the most important parts of building a product: Find them and talk to them.  
People from different backgrounds and different teams have vastly different views and needs for your platform: Ask for feedback and try to provide a great [developer experience](https://microsoft.github.io/code-with-engineering-playbook/developer-experience/) for them.  

&nbsp;

When shipping a full-stack application, we would never ignore the frondent, the same applies to platforms.  
The main frontend of your platform is your documenation: Find out how people use your platform and provide the documenatation which they need, alongside OpenAPI specs etc.  
The more your documentation is tailored to your users' needs, the more likely people will use it and keep it up to date.  

&nbsp;

Lastly, the better your connection to the developers using your platform, the better.  
Fostering a community of platform users through keeping in touch, clear communication of bugs and fixes, can help a great deal to prevent developer frustration.  
This also applies to positive updates: Celebrate your successes and talk about all your new features, which can increase acceptance and excitement for using the great platforms you will build.

:::
::: image
![An image saying "you wouldn't ship a horrible frontend" in the style of the early 2000s piracy PSA.](../static/img/youwouldnt.jpg)\

::: caption
Documentation is your frontend, so don't skimp on making it easy to use.
:::
:::
:::
:::