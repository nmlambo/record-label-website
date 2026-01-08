"use client"

import { useState } from "react"
import { X, Monitor, Wifi, Smartphone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DevicePickerProps {
  isOpen: boolean
  onClose: () => void
}

export function DevicePicker({ isOpen, onClose }: DevicePickerProps) {
  const [selectedDevice, setSelectedDevice] = useState<string>("browser")

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop - excludes music player area */}
      <div 
        className="fixed inset-0 bottom-16 md:bottom-24 bg-black/50 z-60 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <div className="fixed bottom-0 md:bottom-24 right-0 md:right-4 w-full md:w-[400px] bg-background border border-border rounded-t-xl md:rounded-xl z-70 animate-in slide-in-from-bottom md:slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Connect</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Current Device */}
          <div>
            <button
              onClick={() => setSelectedDevice("browser")}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                selectedDevice === "browser"
                  ? "bg-green-500/10 border-green-500"
                  : "bg-muted/50 border-border hover:bg-muted"
              }`}
            >
              <Monitor className={`h-5 w-5 ${selectedDevice === "browser" ? "text-green-500" : ""}`} />
              <div className="flex-1 text-left">
                <p className={`font-medium ${selectedDevice === "browser" ? "text-green-500" : ""}`}>
                  This web browser
                </p>
              </div>
            </button>
          </div>

          {/* No Other Devices */}
          <div>
            <h3 className="text-sm font-semibold mb-3">No other devices found</h3>
            
            <div className="space-y-3">
              {/* Check Wi-Fi */}
              <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
                <Wifi className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm mb-1">Check your Wi-Fi</p>
                  <p className="text-xs text-muted-foreground">
                    Connect the devices you're using to the same Wi-Fi.
                  </p>
                </div>
              </div>

              {/* Play from Another Device */}
              <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
                <Smartphone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm mb-1">Play from another device</p>
                  <p className="text-xs text-muted-foreground">
                    It will automatically appear here.
                  </p>
                </div>
              </div>

              {/* Switch to App */}
              <div className="flex gap-3 p-3 rounded-lg bg-muted/30">
                <svg className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5zM4 15H2v-1.5h2z"/>
                  <path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                <div>
                  <p className="font-medium text-sm mb-1">Switch to the NUMBA app</p>
                  <p className="text-xs text-muted-foreground">
                    The app can detect more devices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Links */}
          <div className="pt-4 border-t border-border space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-sm">
              <span>Don't see your device?</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-sm">
              <span>What can I connect to?</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
