---
title: From Aseprite to Spine part 1
gms2-version:
spine-version: v3.5.46
aseprite-version: v1.2.6
---

### Introduction

During our development of [Tale of Omni](http://taleofomni.blesshaygaming.com/) we use especially two pieces of graphics software: Aseprite and Spine. Aseprite is where we, the Artist and I, draw the graphics. And then, unless the character needs only few or no animations, I animate them in Spine - else they are animated in Aseprite by either of us. When I animate in Spine the character needs to be cut-out into parts, as Spine is software for skeletal animation. To begin with I used Photoshop as an intermediate step for doing this, as you may have seen me explain before.

Today's post will be a tutorial on how to cut out the middle man and make ready-for-Spine content directly in Aseprite.

### Starting Your Work in Aseprite

Since this tutorial is very focused, I will work from the assumption that you know your way around at least the basics of Aseprite and Spine.

**1)** Start off by making a new document big enough to fit everything (you can always resize the canvas as you go, of course). Then make a secondary frame before you draw your parts. Draw on the second frame and let the first frame stay empty - we will be using the first frame for masking later.

If you already have a character ready to cut out, simply insert an empty frame before it.

![Start from the second frame](https://i.imgur.com/5BO5qWa.png)

**2)** Make your character. Draw each body part on its own layer (or cut out an already existing character) and give the layers suitable names. You do not need to follow my naming conventions, but make sure your names are not too abstract, as these will be part of the exported filenames as well. Also add a tag to the skin describing the "type" of character (this might be easier to do after adding more skins in the following step).

![Make your character](https://i.imgur.com/mJxA6IL.png)

**3)** Make more characters. Or "skins" for your character. Of course only if more skins are needed. The alternate skins should fit on top of the original one, as they will end up sharing the same skeleton. If they fit the same type as your previous, original skin, group them under the same tag as I have done. Else group them under other tags.

Note, it is possible to make impactful changes if you can visualize how the skeleton will be (or if you return and make skins after the skeleton is developed). For example, my two panda skins have different tail lengths.

![Make more skins](https://i.imgur.com/hwQusfa.png)

**4)** Time for masking. But before I explain *what* to do, I will explain *why* to do it. 

When working in Spine, I like to be able to reuse. After setting up my skeleton and my first skin - including making meshes and the like - I would rather not have to set the graphics for the following skins by hand as well (I will go more in depth with this in part two of this subject). But if I simply replace a graphic with another, or if I update a graphic and re-import it, and the graphic is not the exact same size as the previous one, then funky stretching will happen as shown below.

(The image below showcases the small, round panda tail being stretched due to a mismatch with the length of the red panda tale)

![Parts not fitting together](https://i.imgur.com/pR7zlUg.png)

This is why I like to make a mask for the graphics. When exporting layers from Aseprite and trimming them (more on this later), the different frames will be trimmed to be of equal size. This means that if a frame is larger in size than another frame (like the red panda tail is longer than the panda tail), the canvas of the panda tail will be enlarged to be the same size.

I use masking to indicate the potential max-size of a given part, thus giving myself room to play around with skins in the future without screwing all my work in Spine up. I do this by going to the first frame, and then I draw pink rectangles on each layer showcasing how big that particular body part should be able to be. Toggling on onion skinning is quite helpful here.

![Draw the mask](https://i.imgur.com/UNeCJsu.png)

I then put a tag like "Mask" on that frame. It is important to do this after being done with the masking, as onion skinning will only work within that tag afterwards.

![Tag it](https://i.imgur.com/yv4mIIM.png)

**5)** Now it is time to export the layers. To do this you need to close down Aseprite, as this is done through the Command Line Interface (CLI) (or in our case through a batch file). Aseprite allows for a lot of awesome stuff through CLI - you can read about it [here](https://www.aseprite.org/docs/cli/).

You start out by opening notepad. Then you define two variables: One for the path to the Aseprite software, and one for the path to the project file.

I like to make my batch file usable across multiple projects, so instead of writing the name of a project file, I fetch the name of the batch file itself and uses that name by writing "%~n0" ([this is what it means](https://stackoverflow.com/questions/112055/what-does-d0-mean-in-a-windows-batch-file)). This way I just need to rename the batch file to fit the project I want it to work its magic on. The two variables looks like this in my case because I use Aseprite from Steam:

```

@set ASEPRITE="C:\Program Files (x86)\Steam\steamapps\common\Aseprite\aseprite.exe"
@set FILENAME="%~n0"
```

I then like to create an asset folder for my parts, which you can do like this (note that I use the previously defined variable for the folder name):

```

mkdir %FILENAME%-assets
```

Then comes cutting out the parts. This is done by running `%ASEPRITE%` with the batch parameter "-b" or "-batch". We tell which file to target, `%FILENAM%`, and then we apply a series of options:

**--trim**: We only want the parts to be as big as their masked areas. If our whole project is 96x96 pixels, we do not want each part to be exported with such a big canvas - it is a waste of resources and makes it harder to work with in Spine.

**--save-as**: We of course want to name our files, and in doing this we can modify what Aseprite exports further: By adding **{layer}** as part of the filename, we tell Aseprite to export each layer individually, and by setting the file extension to **.png**, Aseprite knows that we want individual frames. Since we want to differentiate between tags (as we use them as skin type groupings), **{tag}** makes sense to insert as well, and we can tell which frame in the tag we are looking at by inserting **{tagframe}**. I personally want it to count like 01-02-03 instead of 0-1-2, so I alter the tagframe like this **{tagframe01}** (more formatting options can be found [here](https://www.aseprite.org/docs/cli/#filename-format)).

Finally our line of code should (or could) look as follows:

```

%ASEPRITE% -b %FILENAME%.ase --trim --save-as %FILENAME%-assets/{tag}{tagframe01}_{layer}.png
```

But you might also want to export the assembled characters as an assembly guide to use in Spine. That could look like this:

```

%ASEPRITE% -b %FILENAME%.ase --trim --save-as %FILENAME%-assets/AssemblyGuide.png
```

That concludes our batch file, which should then look like this:

```

@set ASEPRITE="C:\Program Files (x86)\Steam\steamapps\common\Aseprite\aseprite.exe"
@set FILENAME="%~n0"

mkdir %FILENAME%-assets

%ASEPRITE% -b %FILENAME%.ase --trim --save-as %FILENAME%-assets/{tag}{tagframe01}_{layer}.png

%ASEPRITE% -b %FILENAME%.ase --trim --save-as %FILENAME%-assets/AssemblyGuide.png
```

Now you just have to save it. Make sure to give it the exact same name as your Aseprite project file, and in the same folder. The only exception is the file extension. You should save it as a **.bat** file.

![A batch file is made](https://i.imgur.com/GUiXLWN.png)

Then simply double-click the batch file to run it. A Command Prompt window will show momentarily, and then a new folder of assets should be generated.

![New folder](https://i.imgur.com/APqL4Cg.png)

![Folder content](https://i.imgur.com/UfIJEEF.png)

And that's it! At least the part considering Aseprite. From now on, if you make changes to the character or make new skins, you simply delete the asset folder and double-click the batch file to re-generate. That's how easy it is.

Next post will be about how to import and use this content in Spine - stay tuned!