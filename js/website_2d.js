function display (selected)
{
	if (selected == 'Janastu')
	{	
		var option = "JANASTU";
		document.getElementById("texty").innerHTML = "Janastu is a not-for-profit arm which provides IT services for the voluntary and civil society organizations while promoting the notion of “software commons”. <br/> More information on Janastu can be found at <br/>" + option.link("http://janastu.org/");
		document.getElementById("texty").style.display="block";
		document.getElementById("home").style.display="none";
	}
	else  if (selected == 'Research') 
	{
		document.getElementById("texty").innerHTML = "Servelots does research on technology for society. <br/> <a href='#Alipi1' onClick = Alipi()> Alipi</a> <br/> The Re-narration Web is a framework to address the Web-accessibility for the low-literate. <br/> <a href='#Augmented Real Spaces' onClick = Augment()>Augmented Real Spaces</a><br/> Brings a real world space for web based 3D interaction. <br/> <a href='#Semantic Web Social Networking' onClick=Semantic()>Semantic Web social Networking </a> <br/> A toolset for inter-linking information on the Web. <br> <a name='Alipi1' id='Alipi1'> <a name='Augmented Real Spaces' id='Augmented Real Spaces'> <a name='Semantic Web Social Networking' id='Semantic Web Social Networking'>";
		document.getElementById("texty").style.display="block";
		document.getElementById("home").style.display="none";
	}
	else  if (selected == 'Technology') 
	{
		document.getElementById("texty").innerHTML = "<a href = '#Visual Storytelling' onClick = Visual()> Visual Storytelling</a><br/> Based on oral narratives <br/> <a href = '#Wifi-Mesh' onClick = Wifi()> Wifi-Mesh </a> <br/> For location interpretation and capturing cultural practices <br/> <a href = '#Serious Games' onClick = Serious()> Serious Games </a> <br/> In learning contexts. <a name='Visual Storytelling' id='Visual Storytelling'> <a name='Wifi-Mesh' id='Wifi Mesh'><a name='Serious Games' id='Serious Games'>";
		document.getElementById("texty").style.display="block";
		document.getElementById("home").style.display="none";
	}
}

function user (name)
{
	document.getElementById("texty").innerHTML = "Text related to " + name;
	document.getElementById("texty").style.display="block";
	document.getElementById("home").style.display="none";
}

function ShowInfo()
{
	document.getElementById("texty").style.display="none";
	document.getElementById("home").style.display="block";
}

function Alipi()
{
	document.getElementById("texty").innerHTML = "'aLipi' stands for analphabets, non-literates and low-literates.<br/>Smart phones becoming affordable and Internet access by rural agricultural and pastoral nomads is becoming a reality. <br/>What would it be to provision content accessibility to non-literates?<br/> aLipi is an investigation into creating and managing locally relevant accessible content for communities, this is a web-accessibility project which allows users to re-narrate the Web pages or elements, and to access other users' re-narrations. <br/>Thus it changes access to web-content in ways that are relevant for any user, but may be particularly useful to low-literate users and others who are lost in translation.";
}

function Augment()
{
	document.getElementById("texty").innerHTML = "How can a web visitor to be able to walk into an office and start interacting with the objects? <br/> How can we provision 3D desktops with interactive objects? <br/> What would be a simple process and an optimal technology to capture and virtually deploy real spaces augmented with synthetic objects? <br/> How do we handle closed spaces like offices and open spaces like a village or a town? <br/> What are the most appropriate technologies for a web based toolset?";
}

function Semantic()
{
	document.getElementById("texty").innerHTML = "Social Semantic Web is about bringing human scale along with decentralization protocols where purposeful communities can continuously build and manage community knowledge and connect with other communities for a federated universe. <br/>  SWeeT Web is a framework for such a social semantic web. <br/> 'SWeeT Web' is a term that is used to bring a layer of Semantic Web over the available web content by facilitating annotations with semantics. <br/> Alipi, Restory, COWlick are specific applications.";

}

function Visual()
{
	document.getElementById("texty").innerHTML = "Visual storytelling based on oral narratives and other media on the web. <br/> Restory is an app that lets you tell your story citing various sources from the web. This means you are not duplicating content off the internet but merely pointing to it. <br/>Restory app is an instance of SWeeT Web that aims to encourage review of content on the web in a participatory manner by allowing contextual tagging, syndication of reviews and reviewers. <br/>An example is at restory.chaha.in/dasara where Prof. Chaluvaraju of Tribal Studies Department, Kannada University, is doing a visual of his narrative of the Dasara festival that is based on available oral narratives of Hampi and Mysore Dasaras, images, maps, videos and audio content at his website chaha.in and other pages on the Web.";
}

function Wifi()
{
	document.getElementById("texty").innerHTML = "India has mobile phone revolution but much of the country remains out of the coverage of telecom providers, particularly the data connectivity. <br/> Community Owned Wifi-mesh is likely to enable such segments to connect to each other in sustainable and effective ways. <br/> With smart-phones making it easier to bring communication and sharing applications to the people, we can imagine richer experience for rural communities provided these are  low-literate friendly. <br/> We are now looking to test and operationalize a model for community owned wireless mesh networks in rural India that can be used for localized data sharing, and later support the Follow the Sheep project with “Sheep Packs, Sync Mules and Young Shepherds”. <br/> COWlick is a wifi-mesh for location interpretation and capturing cultural practices. <br/> See itb.janastu.org for a development trajectory.";

}

function Serious()
{
	document.getElementById("texty").innerHTML = "Collaborative, game-based learning and problem solving is increasingly being adopted across communities today in a variety of domains. <br/> The major challenge is to design serious game environments that facilitate creation of community knowledge as a result of game-playing. <br/> Such environments need to support individual learning with knowledge co-creation through analytics, metrics and adaptive strategies. <br/> We investigate how to build game-authoring environments that allow games to be (a) modular and configurable, and (b) integrate personal learning with community problem solving. <br/> Specifically, location relevant learning for a rural low-literate community on a WiFi mesh.";
}
