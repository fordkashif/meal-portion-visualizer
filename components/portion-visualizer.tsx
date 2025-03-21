"use client"

import { useState } from "react"
import type { FoodItem } from "@/lib/portion-data"
import { Button } from "@/components/ui/button"
import { Utensils, Home, RotateCcw, RotateCw } from "lucide-react"
import "@/styles/flip-card.css"

interface PortionVisualizerProps {
  food: FoodItem
}

export function PortionVisualizer({ food }: PortionVisualizerProps) {
  const [showObject, setShowObject] = useState(true)
  const [rotation, setRotation] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  // Map food items to visual representations
  const getFoodImage = (food: FoodItem) => {
    // Use placeholder SVGs with different colors based on category
    const colors: Record<string, string> = {
      proteins: "#F87171", // red
      grains: "#FBBF24", // yellow
      fruits: "#34D399", // green
      vegetables: "#60A5FA", // blue
      dairy: "#A78BFA", // purple
      fats: "#FCD34D", // amber
    }

    return `/placeholder.svg?height=200&width=200&text=${food.name}&bg=${colors[food.category].replace("#", "")}`
  }

  const getObjectImage = (food: FoodItem) => {
    // Use placeholder SVGs for household objects
    return `/placeholder.svg?height=200&width=200&text=${food.householdObject}&bg=CCCCCC`
  }

  const handleRotate = (direction: "left" | "right") => {
    setRotation((prev) => (direction === "left" ? prev - 90 : prev + 90))
  }

  const handleToggleView = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setShowObject(!showObject)
      setTimeout(() => {
        setIsFlipping(false)
      }, 150)
    }, 150)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleView}
          className="flex items-center gap-1 text-xs sm:text-sm"
          disabled={isFlipping}
        >
          {showObject ? <Utensils size={16} /> : <Home size={16} />}
          <span>Show {showObject ? "Food" : "Object"}</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleRotate("left")} className="text-xs sm:text-sm">
          <RotateCcw size={16} />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleRotate("right")} className="text-xs sm:text-sm">
          <RotateCw size={16} />
        </Button>
      </div>

      <div className="h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 bg-muted/30 rounded-lg p-4 flex items-center justify-center overflow-hidden">
        <div
          className="flip-card"
          style={{
            width: "150px",
            height: "150px",
            perspective: "1000px",
          }}
        >
          <div
            className="flip-card-inner"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transition: "transform 0.3s",
              transformStyle: "preserve-3d",
              transform: `${isFlipping ? "rotateY(90deg)" : "rotateY(0deg)"} rotate(${rotation}deg)`,
            }}
          >
            <div
              className="flip-card-front"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={showObject ? getObjectImage(food) : getFoodImage(food)}
                alt={showObject ? food.householdObject : food.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center font-medium text-sm sm:text-base lg:text-lg">
        {showObject ? food.householdObject : `${food.name} (${food.servingSize})`}
      </div>
    </div>
  )
}

