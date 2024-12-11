## 1. Project Title and Description
This repositry (proj_beta) holds the files for my personal project site - www.aidanmcinern.com - built as a technical sandbox to try out new tools and techniques outside my usual data science work, including:
- Front-end and backend development.
- Database paradigms i'd otherwise only read about like NoSQL and GraphQL.
- some DevOps best practices, including security, CI/CD and containerization.

The website is pretty lightweight - and by opting for free tier services (where possible) in Azure, the cheapest option in ChatGBT (3.5) and open source,the running cost of the site is around €2/month.

## 2. Technology Stack
The main features of the project:
- Frontend: React, CSS, HTML..
- Interactive 3D elements: built in Blender.
- Data visulisations in Plotly.

- Backend: Node.js.
- APIs: NASA, WorldBank, ChatGBT.
- Databases: MongoDB, Neo4j.
- Data workflow: Ipynb using Polars.
- Devops: Docker, Kubernetes, GitHub Actions, CI/CD pipeline.
- Containerisation: Kubernetes.
- Deployed in Azure: App Service, Keyvault, Databases.

## 3. Installation and Setup
You can use the following steps to recreate the site.
Note: The 3d model is not hosted here. Also API keys and database URIs are secured in AzureVault.

Prerequisites: requires Python, Node.js, Docker
Steps to Clone and Run:
```
git clone https://github.com/aidanmciern/proj_beta.git
cd proj_beta
```

# For backend
```
pip install -r requirements.txt
npm install
cd server
node server.js 
```
# For frontend
```
cd ./../frontend
npm start
```
Environment Variables: [Outline of configuration of required .env variables](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/manage-environment-variables) 

## 4. Learning Objectives & Outcomes
As outlined at the top, the goal was to experiment and get some hands on experience and master certain tools. Below is a summary of these learnings:  

Blender: I previously had no experience whatsoever and i found [blenderguru's channel](https://www.youtube.com/@blenderguru) invaluable to get orientated, as there is a bit of a learning curve. It's pretty intuitive once you reach the plateau and i particularly like the workflow and the flexiblity in creating procedural models. However - and i hate to complain as its open source and generally great - working with armatures drains time away like nothing else - so frustrating!

MongoDB

Neo4j

Polars.

Docker, Kubernetes, 

GitHub Actions, CI/CD pipeline.

## 5. Future Plans
Some possible future enhancements and features i’d like to add:
- Jazz up the pub exterior with dynamic weather, referncing a weather API
- experiment with different LLM options
- more analyics case studies!!

If you have any thoughts, i'd also be delighted them :)
