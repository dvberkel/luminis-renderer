#! /usr/bin/env python

import math

if __name__ == '__main__':
	pointsPerTurn = 10
	numberOfTurns = 5
	numberOfPoints = pointsPerTurn * numberOfTurns
	angle = numberOfTurns * 2 * math.pi / numberOfPoints
	dz = 2.0 / numberOfPoints
	for index in range(0,numberOfPoints + 1):
		x = index * angle
		z = -1 + index * dz
		print math.cos(x), math.sin(x), z;
