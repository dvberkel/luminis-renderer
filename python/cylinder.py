#! /usr/bin/env python

import math
import string
import sys

sceneTemplate = "(scene [{0}])"
pointTemplate = "({0:f}, {1:f}, {2:f}), "

if __name__ == '__main__':
	pointsPerTurn = int(sys.argv[1])
	numberOfTurns = int(sys.argv[2])
	
	numberOfPoints = pointsPerTurn * numberOfTurns
	angle = numberOfTurns * 2 * math.pi / math.sqrt( pointsPerTurn ** 2 + 1)
	dz = 2.0 / numberOfPoints
	
	accumulator = ""
	for index in range(0,numberOfPoints + 1):
		t = index * angle
		z = -1 + index * dz
		accumulator += pointTemplate.format(math.cos(t), math.sin(t), z);
		
	print sceneTemplate.format(accumulator[0:-2])
