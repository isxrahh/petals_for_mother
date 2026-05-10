"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, FabricImage, Textbox, FabricObject, Shadow } from "fabric";
import { Upload, Download, Share2, Sparkles, RotateCcw } from "lucide-react";
import { STICKERS, FRAMES } from "@/types/data";

interface NamedFabricObject extends FabricObject {
  name?: string;
}

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 570;

export default function CardMaker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvas = useRef<Canvas | null>(null);
  const [activeFrame, setActiveFrame] = useState(FRAMES[0].name);
  const [isDownloading, setIsDownloading] = useState(false);

  // Bring text elements to front (above frame)
  const bringTextToFront = useCallback(() => {
    const canvas = fabricCanvas.current;
    if (!canvas) return;

    canvas.getObjects().forEach((obj) => {
      const name = (obj as NamedFabricObject).name;
      if (name === "greeting-text" || name === "sub-text") {
        canvas.bringObjectToFront(obj);
      }
    });
    canvas.renderAll();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: "#fffaf5",
      preserveObjectStacking: true,
      selectionColor: "rgba(216, 92, 131, 0.2)",
      selectionBorderColor: "#D85C83",
      selectionLineWidth: 2,
    });

    fabricCanvas.current = canvas;

    const greeting = new Textbox("Happy Mother's Day", {
      left: CANVAS_WIDTH / 2,
      top: CANVAS_HEIGHT - 290,
      width: 430,
      fontSize: 43,
      fontFamily: "'Playfair Display', serif",
      fill: "#fff",
      textAlign: "center",
      fontWeight: "700",
      editable: true,
      originX: "center",
      shadow: new Shadow({
        color: "rgba(131, 24, 67, 0.15)",
        blur: 4,
        offsetX: 2,
        offsetY: 2,
      }),
    }) as NamedFabricObject;

    greeting.name = "greeting-text";

    canvas.add(greeting);
    const subText = new Textbox("Made with love", {
      left: CANVAS_WIDTH / 2,
      top: CANVAS_HEIGHT - 234,
      width: 320,
      fontSize: 19,
      fontFamily: "serif",
      fill: "#f882b3",
      textAlign: "center",
      editable: true,
      originX: "center",
      opacity: 0.85,
    }) as NamedFabricObject;

    subText.name = "sub-text";
    canvas.add(greeting, subText);

    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !fabricCanvas.current) return;

    const canvas = fabricCanvas.current;
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const imgUrl = event.target?.result as string;

        const oldImage = canvas
          .getObjects()
          .find((obj) => (obj as NamedFabricObject).name === "user-photo");

        if (oldImage) {
          canvas.remove(oldImage);
        }

        const fabricImg = await FabricImage.fromURL(imgUrl, {
          crossOrigin: "anonymous",
        });

        (fabricImg as NamedFabricObject).name = "user-photo";

       // Smart scaling
        fabricImg.scaleToWidth(440);
        if (fabricImg.getScaledHeight() > 380) {
          fabricImg.scaleToHeight(380);
        }

        fabricImg.set({
          left: (CANVAS_WIDTH - fabricImg.getScaledWidth()) / 2,
          top: 75,
          shadow: new Shadow({
            color: "rgba(0,0,0,0.25)",
            blur: 12,
            offsetX: 0,
            offsetY: 6,
          }),
        });

        canvas.add(fabricImg);

        canvas.sendObjectToBack(fabricImg);

        canvas.renderAll();
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsDataURL(file);
  };

  const applyFrame = async (frameSrc: string | null) => {
    const canvas = fabricCanvas.current;

    if (!canvas) return;

    // remove old frame
    const existingFrame = canvas
      .getObjects()
      .find((obj) => (obj as NamedFabricObject).name === "overlay-frame");

    if (existingFrame) {
      canvas.remove(existingFrame);
    }

    if (!frameSrc) {
      canvas.renderAll();
      return;
    }

    try {
      const frameImg = await FabricImage.fromURL(frameSrc);

      (frameImg as NamedFabricObject).name = "overlay-frame";

      // IMPORTANT
      frameImg.set({
        left: 0,
        top: 0,
        originX: "left",
        originY: "top",
        selectable: false,
        evented: false,
      });

      // FORCE exact canvas fit
      frameImg.scaleX = canvas.getWidth() / frameImg.width!;

      frameImg.scaleY = canvas.getHeight() / frameImg.height!;

      canvas.add(frameImg);

      // keep frame above everything
      canvas.sendObjectToBack(frameImg);
      bringTextToFront();
      canvas.renderAll();
    } catch (error) {
      console.error("Frame load failed:", error);
    }
  };
  const addSticker = (emoji: string) => {
    if (!fabricCanvas.current) return;

    const sticker = new Textbox(emoji, {
      left: 250,
      top: 250,
      fontSize: 60,
      editable: true,
    });

    fabricCanvas.current.add(sticker);
    fabricCanvas.current.setActiveObject(sticker);
    fabricCanvas.current.renderAll();
  };

  const resetCanvas = () => {
    if (!fabricCanvas.current) return;
    const canvas = fabricCanvas.current;

    // Remove all except greeting and sub-text
    const objects = canvas.getObjects();
    objects.forEach((obj) => {
      const name = (obj as NamedFabricObject).name;
      if (!name?.includes("greeting") && !name?.includes("sub-text")) {
        canvas.remove(obj);
      }
    });

    // Reset frame
    setActiveFrame(FRAMES[0].name);
    applyFrame(null);

    canvas.renderAll();
  };

  const downloadCard = () => {
    if (!fabricCanvas.current) return;

    const dataURL = fabricCanvas.current.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 3,
    });

    const link = document.createElement("a");

    link.href = dataURL;
    link.download = "mothers-day-card.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#FDE2E8] p-4 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-16 order-2 lg:order-1">
          <section>
            <h3 className="text-[#831843] font-serif text-xl mb-4 flex items-center gap-2">
              <Sparkles size={20} /> 1. Choose a Frame
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {FRAMES.map((frame) => (
                <button
                  key={frame.name}
                  onClick={() => {
                    setActiveFrame(frame.name);
                    applyFrame(frame.src);
                  }}
                  className={`p-4 text-sm rounded-2xl border-2 transition-all ${
                    activeFrame === frame.name
                      ? "border-pink-500 bg-pink-500 text-white shadow-md"
                      : "border-white bg-white/70 text-gray-700 hover:bg-pink-100"
                  }`}>
                  {frame.name}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[#831843] font-serif text-xl mb-4 flex items-center gap-2">
              <Sparkles size={20} /> 2. Add Stickers
            </h3>

            <div className="grid grid-cols-6 gap-3">
              {STICKERS.map((sticker) => (
                <button
                  key={sticker}
                  onClick={() => addSticker(sticker)}
                  className="aspect-square bg-white rounded-2xl text-4xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm active:scale-95">
                  {sticker}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[#831843] font-serif text-xl mb-4 flex items-center gap-2">
              <Sparkles size={20} /> 3. Upload Your Photo
            </h3>

            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#D85C83] rounded-3xl bg-white/60 cursor-pointer hover:bg-white/90 transition-all">
              <Upload className="text-[#D85C83] mb-3" size={32} />

              <p className="text-[#831843] font-medium">
                Click to upload photo
              </p>

              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>
          </section>
        </div>
        <div className="flex flex-col items-center order-1 lg:order-2">
         {/* Preview Area */}
            <div className="flex items-center justify-between w-full max-w-130 mb-5 px-2">
              <h3 className="text-[#831843] font-serif text-3xl">Live Preview</h3>
              <button
                onClick={resetCanvas}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-2xl text-sm font-medium border border-pink-100 transition-all active:scale-95"
              >
                <RotateCcw size={18} /> Reset Card
              </button>
            </div>

            <div className="p-5 sm:p-7 bg-white shadow-2xl shadow-pink-300/40 rounded-3xl">
              <div className="border-8 border-white rounded-2xl overflow-hidden shadow-inner bg-white">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto rounded-xl block"
                />
              </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-md">
              <button
                onClick={downloadCard}
                disabled={isDownloading}
                className="flex-1 bg-linear-to-r from-[#D85C83] to-[#BE185D] hover:brightness-110 active:scale-[0.985] text-white py-4.5 rounded-3xl flex items-center justify-center gap-3 text-xl font-bold shadow-xl transition-all duration-200 disabled:opacity-70"
              >
                <Download size={26} />
                {isDownloading ? "Downloading..." : "Download Card"}
              </button>

              <button className="flex-1 bg-white text-[#831843] border-2 border-[#F9A8D4] py-4.5 rounded-3xl flex items-center justify-center gap-3 text-xl font-bold shadow-lg hover:bg-pink-50 active:scale-[0.985] transition-all">
                <Share2 size={26} /> Share
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
