"use client"

import type React from "react"

import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { MusicPlayer } from "@/components/music-player"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Music, X, CheckCircle2, AlertCircle, Mic, Square, Play, Trash2 } from "lucide-react"
import { useState, useRef } from "react"

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Audio recording state
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [microphoneError, setMicrophoneError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const [uploadType, setUploadType] = useState<"independent" | "label">("independent")
  
  const [formData, setFormData] = useState({
    artistName: "",
    trackTitle: "",
    genre: "",
    description: "",
    email: "",
  })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("audio/"))
    setFiles((prev) => [...prev, ...droppedFiles])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter((file) => file.type.startsWith("audio/"))
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const resetForm = () => {
    setFiles([])
    setUploadProgress(0)
    setUploadComplete(false)
    setRecordedAudio(null)
    setRecordingTime(0)
    setMicrophoneError(null)
    setFormData({
      artistName: "",
      trackTitle: "",
      genre: "",
      description: "",
      email: "",
    })
  }

  // Audio recording functions
  const startRecording = async () => {
    try {
      setMicrophoneError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setRecordedAudio(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setMicrophoneError('No microphone found. Please allow microphone access in your web browser settings.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }

  const deleteRecording = () => {
    setRecordedAudio(null)
    setRecordingTime(0)
  }

  const addRecordingToFiles = () => {
    if (recordedAudio) {
      const file = new File([recordedAudio], `recording-${Date.now()}.webm`, { type: 'audio/webm' })
      setFiles(prev => [...prev, file])
      setRecordedAudio(null)
      setRecordingTime(0)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="min-h-screen pb-32 md:pb-24">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-[1390px]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Release Your Music</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Upload as an independent artist or submit for label consideration. Get paid weekly with transparent splits—no waiting months.
            </p>
          </div>

          {uploadComplete ? (
            <div className="bg-primary/10 border border-primary rounded-lg p-8 text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">
                {uploadType === "independent" ? "Release Published Successfully!" : "Demo Submitted Successfully!"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {uploadType === "independent" 
                  ? "Your music is now live on the platform! Fans can purchase it immediately, and you'll receive weekly payments with a transparent 75/25 split. After 1 month, you're free to release it on other platforms."
                  : "Thank you for your submission. Our A&R team will review your demo and get back to you within 2-4 weeks."
                }
              </p>
              <Button onClick={resetForm}>
                {uploadType === "independent" ? "Upload Another Release" : "Submit Another Demo"}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Upload Type Selection */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3">Choose Upload Type</label>
                <div className="grid md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUploadType("independent")}
                    className={`p-5 rounded-lg border text-left transition-all ${
                      uploadType === "independent"
                        ? "border-white bg-white/5"
                        : "border-border hover:border-white/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        uploadType === "independent" ? "border-white" : "border-muted-foreground"
                      }`}>
                        {uploadType === "independent" && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <h3 className="font-semibold text-base">Independent Artist</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                      Upload and sell your music directly. Keep 75% of sales, get paid weekly, 
                      and enjoy 1-month platform exclusivity before releasing elsewhere.
                    </p>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setUploadType("label")}
                    className={`p-5 rounded-lg border text-left transition-all ${
                      uploadType === "label"
                        ? "border-white bg-white/5"
                        : "border-border hover:border-white/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        uploadType === "label" ? "border-white" : "border-muted-foreground"
                      }`}>
                        {uploadType === "label" && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <h3 className="font-semibold text-base">Submit for Label</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                      Get signed to our label with full A&R support, marketing, and priority placement. 
                      Keep 80% of sales plus promotional benefits.
                    </p>
                  </button>
                </div>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-lg font-semibold mb-4">
                  {uploadType === "independent" ? "Upload your audio files" : "Submit your demo"}
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    isDragging ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-muted rounded-full p-6">
                      <Upload className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-2">Drag and drop audio files to get started</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        For best quality, use WAV, FLAC, AIFF, or ALAC. Maximum file size is 100MB per file.
                      </p>
                      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        Choose Files
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Music className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Track Information - Only show when files are uploaded */}
              {files.length > 0 && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="artistName" className="block text-sm font-medium mb-2">
                        Artist Name *
                      </label>
                      <Input
                        id="artistName"
                        name="artistName"
                        required
                        value={formData.artistName}
                        onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                        placeholder="Your artist name"
                      />
                    </div>
                    <div>
                      <label htmlFor="trackTitle" className="block text-sm font-medium mb-2">
                        Track Title *
                      </label>
                      <Input
                        id="trackTitle"
                        name="trackTitle"
                        required
                        value={formData.trackTitle}
                        onChange={(e) => setFormData({ ...formData, trackTitle: e.target.value })}
                        placeholder="Name of your track"
                      />
                    </div>
                    <div>
                      <label htmlFor="genre" className="block text-sm font-medium mb-2">
                        Genre *
                      </label>
                      <Input
                        id="genre"
                        name="genre"
                        required
                        value={formData.genre}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        placeholder="e.g., House, Techno, Ambient"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      Description / Bio
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Tell us about your music, influences, and any notable achievements..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                </>
              )}

              {/* Audio Recording Section */}
              <div>
                <label className="block text-lg font-semibold mb-4">Or record with a microphone</label>
                <div className="bg-black border border-white/10 rounded-lg p-8 text-center transition-colors">
                  <p className="text-sm text-white mb-6">
                    Upload recorded voice memos, updates, news, or intros to new releases.
                  </p>

                  {microphoneError && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-yellow-500 text-left">{microphoneError}</p>
                    </div>
                  )}

                  {!isRecording && !recordedAudio && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={startRecording}
                      className="cursor-pointer bg-white text-black hover:bg-white/90 border-0"
                    >
                      <Mic className="w-5 h-5 mr-2" />
                      Start Recording
                    </Button>
                  )}

                  {isRecording && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-lg font-mono text-white">{formatTime(recordingTime)}</span>
                      </div>
                      <Button
                        type="button"
                        variant="default"
                        size="lg"
                        onClick={stopRecording}
                        className="cursor-pointer bg-white text-black hover:bg-white/90"
                      >
                        <Square className="w-5 h-5 mr-2" />
                        Stop Recording
                      </Button>
                    </div>
                  )}

                  {recordedAudio && !isRecording && (
                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Music className="w-5 h-5 text-white/70" />
                            <div className="text-left">
                              <p className="font-medium text-white">Recorded Audio</p>
                              <p className="text-sm text-white/70">{formatTime(recordingTime)}</p>
                            </div>
                          </div>
                          <audio src={URL.createObjectURL(recordedAudio)} controls className="h-10" />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={deleteRecording}
                          className="cursor-pointer bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                        <Button
                          type="button"
                          variant="default"
                          onClick={addRecordingToFiles}
                          className="cursor-pointer bg-white text-black hover:bg-white/90"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Add to Files
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="bg-muted rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-sm font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Guidelines */}
              <div className="bg-muted/50 border border-border rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      {uploadType === "independent" ? "Platform Guidelines" : "Submission Guidelines"}
                    </h3>
                    {uploadType === "independent" ? (
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Upload high-quality audio files (WAV, FLAC preferred)</li>
                        <li>• Your music will be exclusive to our platform for 1 month</li>
                        <li>• You keep 75% of all sales, paid weekly</li>
                        <li>• Only original productions or properly licensed content</li>
                      </ul>
                    ) : (
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Submit 1-3 of your best tracks</li>
                        <li>• Include a brief description of your music and background</li>
                        <li>• We review all submissions within 2-4 weeks</li>
                        <li>• Only original productions will be considered</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={files.length === 0 || isUploading}>
                {isUploading ? "Uploading..." : uploadType === "independent" ? "Publish Release" : "Submit Demo"}
              </Button>
            </form>
          )}
        </div>
      </main>
      <MobileNav />
      <MusicPlayer />
    </div>
  )
}
