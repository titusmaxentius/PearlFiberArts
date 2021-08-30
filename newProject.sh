#! /bin/bash
# Simple script to launch a new project, create the folders
# and make sure that everything is clean and ready to go for 
# designing (including the templates that need to be created)

echo -n "Project Name: "
read projName

build_Folder() {
    `mkdir ` $projName 
}

prefill_Templates() {
    
}