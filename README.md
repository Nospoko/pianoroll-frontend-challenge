# PianoRoll Frontend Excercise

## Introduction

You will be building on top of a demo code that generates a widget for browsing Piano Rolls - the core element of [pianoroll](https://pianoroll.io).
The goal is to enhance the user interface and add an interactive component.

This is what the starting point looks like:

<img width="666" alt="image" src="https://github.com/Nospoko/pianoroll-frontend-challenge/assets/8056825/daf35d32-f4e5-4a00-bbe8-78ecec2f2011">

## Task description

### Part 1: Display

We want to implement an interface following the design similar to YouTube. There are two states we need to implement:

#### Grid layout

```
+--------------+   +--------------+   +--------------+
|              |   |              |   |              |
|  Piano Roll  |   |  Piano Roll  |   |  Piano Roll  |
|              |   |              |   |              |
+--------------+   +--------------+   +--------------+
+--------------+   +--------------+   +--------------+
|              |   |              |   |              |
|  Piano Roll  |   |  Piano Roll  |   |  Piano Roll  |
|              |   |              |   |              |
+--------------+   +--------------+   +--------------+
+--------------+   +--------------+   +--------------+
|              |   |              |   |              |
|  Piano Roll  |   |  Piano Roll  |   |  Piano Roll  |
|              |   |              |   |              |
+--------------+   +--------------+   +--------------+
```

#### Main View

```
+-----------------------------------+  +--------------+
|                                   |  |              |
|                                   |  |  Piano Roll  |
|                                   |  |              |
|        Main Piano Roll            |  +--------------+
|                                   |  +--------------+
|                                   |  |              |
|                                   |  |  Piano Roll  |
+-----------------------------------+  |              |
                                       +--------------+
                                             ...
```

Here are development tasks to build this interface:

1. **Implement Grid Layout**: Display the Piano Rolls in a responsive grid layout on the main page.
2. **Implement Interactive Selection**: Make each Piano Roll in the grid clickable. Upon clicking an item, it should become the main element on the page, enlarging for better visibility.
3. **List Display**: Simultaneously, display the rest of the Piano Rolls in a vertical list on the right side of the page, similar to how videos are listed on YouTube’s watch page. Ensure that the list is scrollable if there are more items than can fit on the screen.
4. **Styling**: Apply styling to make the grid and its items visually appealing. Ensure that Piano Rolls are identifiable and have a consistent size across different screen resolutions.
