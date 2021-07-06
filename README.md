# MicrotonalChordGenerator-p5.jsVisualsGenerator

This project is an attempt to create procedurally generated art in two separate yet interdependent stages. 

STAGE 1: Microtonal Chord Generator
Created using the pygame mixer and custom triangle waves.

The microtonal chord generator produces a chord in which every new element is created with reference to the most recently added element. The user is prompted for initial information, such as number of voices in the chord, initial note of the chord, and wave shape of the inital note. This is interpreted, and the procedural generation begins. The second note of the chord is based off the first note, the third note of the chord will be based off the second note, and so on.

After the chord is generated, the data is recorded into two separate logs: one for musical analysis, and one for raw data. The log for musical analysis is legible and tidy, allowing for theoretical analysis of the chords, while the log for raw data is in a stripped, compact form giving only what is needed for parsing in the next stage.

STAGE 2: p5.js
--UNDER CONSTRUCTION--
P5.js generates a visual fragment using the raw data generated in the previous stage. The text from the raw data log is parsed and interpreted in the p5.js script, and produces a visual that is entirely cohesive with the contents of the chord.
