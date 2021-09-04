<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xhtml" version="5.0" indent="yes"/>
	
	<xsl:template match="/">
		<html>
			<head>
				<title>Pattern: </title>
				<style>@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;700&display=swap');</style> 
			</head>
			
			<body>
			
			</body>
		</html>	
	
	</xsl:template>
	
	<xsl:template match="KCODEVERSION">
		<span class="metadata">KCODE Spec: <xsl:value-of select="."/></span>
	</xsl:template>
	
</xsl:stylesheet>