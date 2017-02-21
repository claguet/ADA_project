# ADA Project
Influence of demographic, economic and social characteristics of cantons in the results of Swiss federal votations. 

Authors: Clémentine Aguet, María Cervera and Claire Lugrin

## Abstract

Swiss politics are steered by regular federal votations that take place several times a year. As a swiss citizen, it might be difcult to keep track of the many results of votations and be aware of how deep economic, social and cultural diferences may lead to considerable geographical diferences in the votation tendencies. In this context, we explored the relationship between cantonal characteristics and votation outcomes and developed a tool to interactively visualize them. 17 social, economic and demographic features were found to signifcantly correlate with votation outcomes. Out of these, six were selected for display in a map where the orientation of the results of votations (right/left) can be optionally overlayed for several votation categories, including economy, health, immigration and more. Overall, this tool allows to intuitively identify the factors afecting swiss votation outcomes, and gain insights about swiss society.

<b>GOALS</b>
<li>To create an interactive map, showing the results of the votation per canton and per thematic category
<li>To explore possible statistically significant correlation between demographic, social and economic parameters and votation outcomes

The poster created for the presentation can be found in the *Poster* folder in the GitHug repository.

## Data Description

Most of the data used in this Project can be downloaded from the online portal of the Swiss government. https://www.admin.ch/ We will mainly use demographic and political data for the different cantons.

<b>POLITICAL DATA</b>
<li> Results of the federal votations (2010-2016): For each popular votation, we have the number and percentage of people that voted yes, no or blank, as well as the participation levels. This information is available for the whole [country](https://www.bfs.admin.ch/bfs/fr/home/statistiques/politique/votations.assetdetail.255285.html) (downloadable table) or by [canton]( https://www.bfs.admin.ch/bfs/fr/home/statistiques/catalogues-banques-donnees/tableaux.html) (tables to be scraped)
<li> [Votations recommentations]( https://www.bfs.admin.ch/bfs/fr/home/statistiques/politique.assetdetail.335646.html) by party (2010-2016): 
For each votation in a given year, we have the recommendations of the main parties (as yes or no).
<li>The parties were classified as having more left or right tendancy (http://www.rts.ch/info/suisse/5790650-l-udc-se-distancie-toujours-plus-du-bloc-bourgeois-selon-une-etude.html, https://fr.wikipedia.org/wiki/Partis_politiques_suisses)

<b>DEMOGRAPHIC DATA</b>
<li> [Education level](https://www.bfs.admin.ch/bfs/fr/home/statistiques/education-science/niveau-formation-competences.assetdetail.333136.html) by canton (2014): 
For each canton, we have the absolute number and percentage of resident people having achieved each of the following educational levels: sans formation postobligatoire, degré secondaire professionnel, degré secondaire general, formation proffessionnelle supérieure, hautes écoles.
<li> [Education expenses](http://www.scris.vd.ch/Default.aspx?DocID=5468&DomId=2021) by canton (2005-2012): 
For each canton, amount of money (and percentage of total expenses in the canton) that was invested in education. The amount of money spent per habitant is also available.
<li> [Age and sex]( https://www.bfs.admin.ch/bfs/en/home/statistics/population.assetdetail.291230.html)  by canton: Average age of the permanent resident population by category of citizenship, sex and canton: 

<li> [Number of residents] (https://www.bfs.admin.ch/bfs/en/home/statistics/population.assetdetail.300201.html) Average permanent resident population by canton, in 2011-2015 

<li> [Various indicators] (https://www.bfs.admin.ch/bfs/en/home/statistics/catalogues-databases/tables.assetdetail.328177.html). Age of the population, urban population, main language, religious affiliation, urban/agricultural area, worka and income... lots of data per canton

<li> [Various indicators] (https://www.bfs.admin.ch/bfs/en/home/statistics/catalogues-databases/tables.assetdetail.299707.html) Structure of the permanent resident population by canton. Contains gender, citizenship, marital status

## Methods

<b> I. DATA ACQUISITION </b>

Recommendation data and demographic data were downloaded as tables from [www.admin.ch](https://www.admin.ch).
Results of federal votations published in [www.admin.ch]( https://www.admin.ch/ch/f/pore/va/vab_2_2_4_1_2011_2020.html) were scraped and stored as excel tables. The code can be found in <i>Data/ScrapeVotationTables.ipynb</i>. The scraped data are stored in <i>Data/Votations</i>.

<b> II. DATA PROCESSING </b>

<b> Categorization of Votations :</b>

Votations are sorted in 8 different categories (education, economy, health…). How each votation is labeled can be found in the notebook <i>Data/ScrapeVotationTables.ipynb</i>

<b> Categorization of Political parties :</b>

There were 14 political parties that emmited recommandations on what people should vote for the different votations. We reduced this number by grouping the parties by political orientations (Right or Left). This was done using two different methods: manually and thanks to unsupervised classification (K-means) trained on the recommendations for each votations. The K-means clustering of the political parties can be found in the notebook <i>Data Analysis/Analysis of the political groups Clustering.ipynb</i>.
Both methods produced the same clustering.

On the 14 political parties, 8 represented more than 95% of the votes received at the National Council elections in 2015. We only kept those 8 parties in the rest of the analysis.

<b> Computation of the votations outcome:</b>

The votations outcome were provided by [www.admin.ch](https://www.admin.ch) as percentage of yes and no for each votation and each canton. This result is not very informative, as a "yes" to one votation can be politically equivalent to a "no" to another votation, depending on the political orientation of the question proposed in each votation.

The raw outcome of the votations ("Yes" won or "No" won) was thus combined with the recommendations of the left and the right parties.

The first step for computation was to evaluate the main recommendations of the left and the right groups (as the parties don't always homogeneously agree on what to recommend). This was done by weighting the recommendations by the percentag of votes each party received at the National Council elections of 2015.

From the recommendations of each group two types of votations outcomes were computed.
- The first one was a 4 classes outcome: Left Won (ie. the main recommendation of the left group was followed), Right Won, Both Won (because they can have emitted the same recommendation) or None Won. See the notebook  <i>Data Analysis/Compute recommandations and votations outcome.ipynb</i> for the detail of this computation.
- The second outcome was a political score from -1 to +1, representing the proportion of victories of the Right group (number of votations for which their recommendation was followed) compared to the ones of the Left group. The score is negative when the left group won more often, and the score is positive when the right group won more often, a score of 0 means that right and left had their recommendation followed an equal number of times.

This political score was computed for all the votations, but also per category of votations (one score per canton per category of votation), allowing an analysis of the votations grouped by thematic categories. The detail of this computationcan be found in the notebook <i>Data Analysis/Analysis demographics influence on votations.ipynb</i>

<b> Computation of demographic features :</b>

The demographic data obtained from [www.admin.ch](https://www.admin.ch) were cleaned and combined to avoid having highly correlated and repeated data.

The different demographic features were not necessarily reported for the same years, and some were reported for different years although they didn't differ much. The strategy adopted was to average these features for the years 2011 to 2014 (the years for which we studied the votations). Some more meaningful features were also computed such as the difference in the population between 2004 and 2014 or the percentage of females in each canton. More detail about the data wrangling and feature engineering can be found in the notebook <i>Data Analysis/Clean various demographic data.ipynb</i>

<b> III. DATA ANALYSIS </b>

<b> Clustering of the political parties :</b>

As mentionned above, this analysis can be found in the notebook <i>Data Analysis/Analysis of the political groups Clustering.ipynb</i>


For all the following steps, the analysis can be found in the notebook <i>Data Analysis/Analysis demographics influence on votations.ipynb</i>

<b> Analysing the votations outcome as individual samples :</b>

First we atempted to predict the 4 classes of the votations outcome (right won, left won, both or none won) for the votations treated individually as samples. We used a RandomForrest classifier trained on the demographic features for each canton and on the votation category. The accuracy was very low and the only relevant feature was the votation's category.

This poor accuracy and relevance of the demographic features was most likely due to a highly correlated features matrix: for each sample (votation outcome) most feature were similar (the demographic features were identical for all the votations outcome of one canton).

The rest of the analysis was performed with the second outcome we computed for the votations: the scores for each cantons and types of votations.

<b> Cantons clusterings :</b>
The cantons were clustered based on their scores for each category of votations. 

<b> Regression :</b>

Cross correlations were performed between the demographic parameters and the score of each canton for each votations types. The features for which the correlations had a p-value lower than 0.01 were considered significantly correlated with the votations outcome. The cross correlation was used to analyse the scores for all the votations together, and the scores for each votations categories. The significant features were kept for further analysis.

Linear regressions were performed individually between the significant features and the scores. The data and regression curve were displayed for some features.

Generalised linear model and Random forest regression were used to compute the correlation between the 17 significant features (multiparameter regression) and the scores.

<b> Predicting the votations outcome :</b>

Random forrest classifiers were used to predict the outcome of the votations of different types, based on the significant demographic features. 

<b> IV. INTERACTIVE VISUALIZATION </b>

<b> Data adaptation for Leaflet </b>
Cantonal boundaries information was adapted from the topoJSON file that was made available to us for a previous project. Arcs had to be transformed to coordinates for Leaflet to be able to operate with it as a geoJSON file. We used an online tool for the conversion: (http://mapshaper.org). The file obtained with this is <i>Visualization/cantons_geo.json</i>. 

<b> Adding features to our json data</b>
For the visualization, we had to add cantonal demographic, economic and social characteristics as properties of our features in our .json file. This step is done in the notebook <i>Visualization/geojson_edit.ipynb</i>. This notebook allows to extract the data as a .js file for use with Leaflet. 

<b> Map Display </b>
The interactive visualization map was developed using Javascript [Leaflet library](http://leafletjs.com). To be able to visualize it, we created a webpage (not publicly available) using [HTML5 and CSS3](https://openclassrooms.com/courses), which is accessible when opening the *map.html* file present in the *Visualization* folder. Once the page open, here are the different functionnalities that can be displayed on the map.
<ul>
<li>Choose between 4 different basemaps</li>
<li>Select a demographic, social or economic information to display</li>
<li>Place the mouse over a canton to show the corresponding value in the right top frame</li>
<li>Select a votation thematic</li>
<li>Votation outcomes of each canton relative to the chosen category are displayed on the map</li>
<li>Click on a canton to obtain more detailed information about who won (left or right) and with which score</li>
</ul>

## Results

<b> DATA ANAYSIS</b>
<ul>
<li> Parties were separated in two blocks representing the right and the left(). Manual separation and k-means clustering with 2 classes yielded the same results. </li>
<li> Votation category was the most important parameter affecting the outcome of the individual votations. </li>
<li> 17 features were found to significantly correlate with the votations scores.</li>
<li> These 17 features explain 93% of the variance across cantons in the votations scores.</li>
<li> Clustering of cantons according to their votation tendencies groups together french-speaking cantons, reflecting important cultural differences across the country.</li>
</ul>

<b>DATA VISUALIZATION</b>
<ul>
<li> Map to interactively display several demographic features and overlay the orientation (right/left) of the votation outcomes for different votation categories. </li>
<li> This visualization allows to intuitively identify cantonal features that correlate with the results of votations.</li> 
</ul>
![image](/Poster/Map/Foreign.png)

## Challenges

First of all, votations data had to be scraped from the web. This data has difficult to analyze because the outcomes (yes/no to each law) did not directly relate to the political orientation of the result (right/left). It was thus challenging to combine and make sense of all this data for further analysis. Furthermore, our votation dataset was highly repetitive because several votations shared the same demographics (i.e. for votations done the same day). So we had to combine our votations in categories.

Second, the development of the interactive visualization posed us some important technical challenges: we had to learn how to use html and css for the webpage display of the map, and javascript to adapt leaflet to it. Furthermore, adapting the geographical data of cantons for leaflet was somewhat tricky.

## Future development

<ul>
<li>Find a more intuitive way to display the voting results</li>
<li>Add further demographic, social and economic features to represent on the map</li>
<li>Add the option to either display voting results grouped by thematics or outcomes of
individual votations</li>
<li>Put the map on the web making it publicly available to everyone</li>
<li>Automatically updated the map after each voting or when new demographic data are
accessible</li>
<li>Extend the project to other countries</li>
</ul>
