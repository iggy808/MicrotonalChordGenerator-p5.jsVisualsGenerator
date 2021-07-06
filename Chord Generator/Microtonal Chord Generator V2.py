import pygame
from array import array
import math
from time import sleep
from random import randint
from datetime import datetime

#mixer constants
MIXER_FREQ = 44100
#^sample rate
MIXER_SIZE = -16
MIXER_CHANS = 1
MIXER_BUFF = 1024
#initialize pygame mixer
pygame.mixer.init(MIXER_FREQ, MIXER_SIZE, MIXER_CHANS, MIXER_BUFF)
#initializing analysis tools
#have to use global bc of architecture - not ideal but works lol.
#need it in harmonizing note function- would have to pass it every time
MusicTheoryData_halfsteps = ["N/A"]

#note class
class Note(pygame.mixer.Sound):

    def __init__(self, freq, form):
        self.freq = freq #NOTE FREQUENCY
        self.waveform = form
        #not clean, but made wav data a field for the note itself
        #hopefully this will make accessing each notes data for wav scripting easier
        #period is taken from the build samples function
        period = int(round(MIXER_FREQ/self.freq))
        self.wavSamples = array("h",[0]*period)
        pygame.mixer.Sound.__init__(self, buffer=self.build_samples())
        if (self.waveform == "square"):
            self.set_volume(0.03)
        elif (self.waveform == "trongle"):
            self.set_volume(0.1)
        
        

        
    def build_samples(self):
        #really long wavelength = lots of samples (due to fixed sample rate (MIXER_FREQ))
        period = int(round(MIXER_FREQ/self.freq))
        amplitude = 2**(abs(MIXER_SIZE)-1)-1

        #generate an array for this note's samples
        #contains appropriate # of samples
        samples = array("h",[0]*period)

        if self.waveform == "square":
            for t in range(period):
                if (t<period/2):
                    samples[t] = amplitude
                    self.wavSamples[t] = amplitude
                else:
                    samples[t] = -amplitude
                    self.wavSamples[t] = -amplitude
                    
        #generate triangle wave
        elif self.waveform == "trongle":
            #for every discrete slice of audio, configure the amplitude
            for t in range(period):
                #same method as sawtooth for the first half of the period
                if (t<period/2):
                    samples[t] = int(amplitude*(t/period))
                #halfway through the wavelength, decrease linerly by subtracting the time dependent amplitude (amplitude*(t/period)) from the max amplitude (amplitude)
                else:
                    samples[t] = int(amplitude - (amplitude*(t/period)))
                    
        return samples

    def __str__(self):
        return "frequency: {}, waveform: {}".format(self.freq, self.waveform)

def mainSequence():
    #initializing lists for theory analysis
    global MusicTheoryData_halfsteps
    

    #Gather initial info from user
    voiceNum = int(input("How many voices would you like in the chord? "))
    initFreq = int(input("What frequency would you like to begin the chord? (integer and float values accepted) "))
    initTimbre = input("What timbre would you like to begin the chord? ('square' or 'trongle' accepted) ")
    #timbreVariance - float [0,1], adjusts randomization on the waveform to allow for timbral consistency
    
    voice1 = Note(initFreq, initTimbre)
    print(str(voice1.wavSamples))
    voices = generateVoices(voice1, voiceNum)

    displayVoiceData(voices, MusicTheoryData_halfsteps)
    
    playVoices(voices)

    recordController = input("Would you like to record this data? (y/n)")
    if recordController == "y":
        gatherData(voices)
    elif recordController == "n":
        print(":/")
        return
    


def displayVoiceData(voices, halfstepDistance_list):
    
    for i in range(len(voices)):
        print(voices[i], "Half steps from previous note: ", halfstepDistance_list[i])
              


def playVoices(voices):

    for i in range(len(voices)):
        #if possible,
        #wavFile = writeToWavFile EPIC
        voices[i].play(-1)
        sleep(2)
        #end wav file building
    
    
    return

#######harmonizing frequency
def harmonizingFrequency(voice):
    #bringing in analysis tool
    global MusicTheoryData_halfsteps
    #formula for finding the frequency of a pitch with respect to a given pitch
    #at n number of halfsteps
    # root_pitch * 2^(n/12)
    
    
    #making the harmonizing note be within but not including the octave
    harmNote = randint(0,11)
    #maybe do visual art w this data??
    #look into using text data with processing

    #controller for indicating the direction of the movement in pitches
    #harmFreq (n in the above formula) changed to negative indicates a leap down
    #up = 0, the pitch increases
    #down = 1, the pitch decreases
    up_downController = randint(0,1)
    #controller for adding or subtracting extra frequencies to the pitch
    #add = 0, the extra cents are added
    #sub = 1, the extra centes are subtracted
    add_subController = randint(0,1)

    
    #splitter for directing addition or subtraction of cents from pitch
    #and direction of motion in pitch
    #(pushing for a lil microtonality here,
    #might need to randomize cents added and subtracted)
    #or develop a whole new accurate system for it - current state doesnt sit well w me
    if add_subController == 0 and up_downController == 0:
        #new frequency (float) represented by formula
        freq = (voice.freq * 2**(harmNote/12)) + 0
    elif add_subController == 0 and up_downController == 1:
        harmNote = -harmNote
        freq = (voice.freq * 2**((harmNote)/12)) + 0    
    elif add_subController == 1 and up_downController == 0: 
        freq = (voice.freq * 2**(harmNote/12)) - 0
    elif add_subController == 1 and up_downController == 1:
        harmNote = -harmNote
        freq = (voice.freq * 2**((harmNote)/12)) - 0

    square_trongleController = randint(0,1)
    #0 = sqaure
    #1 = trongle
    #print("wave type: " +str(square_trongleController))
    if square_trongleController == 0:
        harmonizingFrequency = Note(freq, "square")
    elif square_trongleController == 1:
        harmonizingFrequency = Note(freq, "trongle")

    MusicTheoryData_halfsteps.append(harmNote)
    
    return harmonizingFrequency

def generateVoices(initVoice, voiceNum):
    
    voice2 = harmonizingFrequency(initVoice)
    
    voices = [initVoice, voice2]
    
    if (voiceNum > 2):
        #counter used for an list index argument
        voiceCounter = 2
        for i in range(voiceNum - 2):
            #i can detect which voice is the previous voice by using a counter
            #counter = 0, then harmoningFrequency needs to be voice2

            
            #new voice created based off previous voice
            #(the most recent entry in the list)
            newVoice = harmonizingFrequency(voices[voiceCounter-1])


            voices.append(newVoice)
            voiceCounter+=1
        

    return voices
            
def gatherData(voices):
    global MusicTheoryData_halfsteps
    #write to text file
    
    #Music Analysis Log
    #write legibly for analyzing
    #include date and time of entry, chord # recorded on that day (ex. 01),
    #chord name optional, notes optional (write like the print statement)
    

    #opening text file in append and read mode
    MusicAnalysisLog = open("MusicAnalysisLog.txt","a")

    #prepping the string list for writelines function
    maEntry = []
    maDivider = "--------------------------\n"
    maHeader = "{}\n".format(datetime.now())#, chordNum)
    maEntry.append(maDivider)
    maEntry.append(maHeader)

    
    #counter to name voices correctly
    voiceCounter = 1
    for voice in voices:
        maEntry.append("Voice {}: {}\n".format(voiceCounter, str(voice)))
        maEntry.append("Half-steps away from previous note: {}\n".format(MusicTheoryData_halfsteps[voiceCounter-1]))
        voiceCounter += 1
    
    #writing string list to log
    MusicAnalysisLog.writelines(maEntry)
    MusicAnalysisLog.close()
    
    

    #Raw Data Log
    #write optimally for parsing
    #use commas to separate
    #   line.split(,)
    #strips whitespace in line
    #   i.strip() for i in line
    #include voice number, frequency(decimals limited or even excluded), halfsteps away

    RawDataLog = open("RawDataLog.txt","a")

    rdEntry = []
    rdEntry.append("-")

    voiceCounter = 1
    for voice in voices:
        #'-' indicates the start of a new sequence/chord
        #',' commas separate each piece of info
        #'_' underscores separate the voices
        # voiceFreq, voiceWaveform, halfstepsFromPrevVoice, voiceNote
        rdEntry.append("{},{},{}_".format(voice.freq, voice.waveform, MusicTheoryData_halfsteps[voiceCounter-1]))
        voiceCounter += 1

    RawDataLog.writelines(rdEntry)
    RawDataLog.close()
    
    return
            
mainSequence()      
        





























    
