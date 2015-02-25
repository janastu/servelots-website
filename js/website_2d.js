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
		document.getElementById("texty").innerHTML = "Servelots does research on technology for society. <br/><a href='#Alipi1'> Alipi</a> <br/> The Re-narration Web is a framework to address the Web-accessibility for the low-literate. <br/> <a href='#Augmented Real Spaces'>Augmented Real Spaces</a><br/> Brings a real world space for web based 3D interaction. <br/> Semantic Web Social Networking <br/> A toolset for inter-linking information on the Web. <br> <a name='Alipi1' id='Alipi1'> <a name='Augmented Real Spaces' id='Augmented Real Spaces'> ";
		document.getElementById("texty").style.display="block";
		document.getElementById("home").style.display="none";
	}
	else  if (selected == 'Technology') 
	{
		document.getElementById("texty").innerHTML = "Visual storytelling <br/> Based on oral narratives <br/> Wifi-Mesh <br/> For location interpretation and capturing cultural practices <br/> Serious Games <br/> In learning contexts" + selected ;
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

