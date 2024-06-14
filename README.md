# How To Quant (frontend)

This is a **proof of concept** hobby project aimed at exploration of finance topics and their technical implementation. While the functionality and architecture bares some resemblance to real-world systems and some of the data reflects true facts, no part of this project is intended as financial advice and is not to be considered as such.

The front-end is deployed to [howtoquant.com](https://howtoquant.com).

The back-end repository is available [here](https://github.com/VikSil/howtoquant-backend).

<p align = "center">
<img height= "280" src="https://raw.githubusercontent.com/VikSil/howtoquant-frontend/trunk/src/assets/img/GIF_demo.gif" alt="How to Quant demo GIF"/>
</p>

## Table of contents

<ol>
<li><a href = "#project-structure">Project structure</a></li>
<li><a href = "#interface-and-functionality">Interface and functionality</a></li>
<li><a href = "#running-locally">Running locally</a></li>
<li><a href = "#past-sprints">Past sprints</a></li>
<li><a href = "#roadmap">Roadmap</a></li>
</ol>

## Project structure

The project is built in Javascript with React framework. The website provides frontend interface to backend JSON API endpoints and implements a simplified business logic of a conceptual finance information system. The file structure of source folder is organised as follows:

* __main.jsx__ - application wrapper and entry point.
* __App.jsx__ - provides website layout and routing.
* __assets__ - directory contains CSS and image files.
* __components__ - directory contains reusable React components
    * _containers_ - directory contains wrapper components responsible for dynamically rendering primitive components, based on the data passed to the container
    * _layout_ - directory contains components responsible for rendering the layout of the website
    * _pages_ - directory contains compositions of individual pages of the website
    * _primitives_ - directory contains the base elements that pages are composed of
    * _static_ - directory contains components that cannot be interacted with
* __context__ - directory contains React Context pertaining to the current user
* __utils__ - directory contains JavaScript code  for API calls and reusable operations for components



## Interface and functionality

The layout of the website has the following sections:

* __Instruments__ - provides functionality for interactions with instrument static data (equities only)
    * _Equities_ - retrieve a list of all instruments and view static data by ticker
    * _New Instrument_ - download a new instrument from Yahoo Finance API or input manually
* __Market Data__ - provides functionality for interactions with market data (prices only)
    * _Identifiers_ - retrieve a list of all identifiers
    * _Prices_ -view all prices previously saved to the database, download prices from Polygon.io API, selectively save prices to the database
* __Organizations__ - provides functionality for organization management
    * _Funds_ - retrieve a list of all funds and create a new fund
    * _Books_ - retrieve a list of all books and create a new book
    * _Strategies_ - retrieve a list of all strategies and create a new strategy
    * _PB Accounts_ - retrieve a list of all prime brokers and prime broker accounts and create a new ones.

## Running locally

### Requirements and dependencies

#### Hardware requirements:
* Network card and internet connection.
* Processor and RAM requirements depend on the browser of your choice.
* Storage space of at least 75 MB to clone the repository.

#### Software dependencies:
* Git
* Node.js and nmp
* [Backend](https://github.com/VikSil/howtoquant-backend) of the project running locally


### Setting up the project

Follow these steps to set up the project on a local machine:

1. Create a directory where the project will be contained and [git clone](https://git-scm.com/docs/git-clone) this repository. 
1. In console navigate to the root directory of the project (where `package.json` file is located).
1. Run `npm install` to install all JavaScript dependencies (this will take several minutes to complete). 
1. Make sure that the backend is running on `http://127.0.0.1:8000/`.
1. You should be ready to start the frontend server.

### Starting the server and accessing endpoints

To start the server execute this command `npm run dev`. If successful, you should see a line `Local: http://localhost:5173` amongst the output.

The website will now be available on the localhost. Input  `http://localhost:5173` in the browser to access it.

## Past sprints

Code and release notes of each of the past releases can be found in the respective branch of this repo, as per table below.

<table>
    <thead>
        <tr>
            <th>Sprint No.</th>
            <th>Relase notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align = "center">#1</td>
            <td><a href = "https://github.com/VikSil/howtoquant-frontend/tree/v.0.1.0-alpha">v.0.1.0-alpha</a></td>
        </tr>
        <tr>
            <td align = "center">#2</td>
            <td><a href = "https://github.com/VikSil/howtoquant-frontend/tree/v.0.2.0">v.0.2.0</a></td>
        </tr>
    </tbody>
</table>

## Roadmap

The trajectory of this project is bound to change in accordance to time constraints, priorities and interests of the author. A rough plan for near future sprints is as follows:

<table>
    <thead>
        <tr>
            <th>Sprint No.</th>
            <th align = "center">Tasks</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align = "center">#3</td>
            <td><ul>
            <li>Add interface for manual trade data input</li>
            <li>Add page for viewing trade list and individual trade data </li>
            <li>Add page for position data viewing</li>
            </ul></td>
        </tr>
        <tr>
            <td align = "center">#4</td>
            <td><ul>
            <li>Update position page in accordance to backend changes</li>
            <li>Add tooltips component and Sources page</li>
            <li>Add contacts page</li>
            </ul></td>
        </tr>
        <tr>
            <td align = "center">#5</td>
            <td><ul>
            <li>Add Selenium test suite</li>
            </ul></td>
        </tr>
        <tr>
            <td align = "center">#6</td>
            <td><ul>
            <li>Add sign up page</li>
            <li>Add login page</li>
            <li>Expand user context and add user configuration page</li>
            </ul></td>
        </tr>
        <tr>
            <td align = "center">#7</td>
            <td><ul>
            <li>Add Risk section and VaR page in accordance to backend changes</li>
            </ul></td>
        </tr>
        <tr>
            <td align = "center">...</td>
            <td><ul>
            ...
            </ul></td>
        </tr>
    </tbody>
</table>

## License

The source code and all artifacts are available under [CC BY-NC-SA 4.0 DEED](https://creativecommons.org/licenses/by-nc-sa/4.0/) terms. 