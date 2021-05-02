import { outputHTMLConfig } from "./output";

interface Data {
  pattern: string;
  barcode: string;
  mode: string;
  model: string;
  sound: string;
  image: string;
  video: string;
  repeat: string;
}

class InputManager {
  private prepared: boolean;
  private patterns: Array<string>;
  private barcodes: Array<number>;

  private data: Array<Data>;
  private output: string;

  constructor() {
    this.prepared = true;
    this.patterns = [];
    this.barcodes = [];

    this.data = [];
    this.output = outputHTMLConfig[0];
  }

  addPattern(pattern: any) {
    if (isNaN(pattern)) {
      this.patterns.push(pattern);
      this.barcodes.push(-1);
    } else {
      this.patterns.push("");
      this.barcodes.push(pattern);
    }
  }

  public get getPatterns() {
    return this.patterns;
  }

  public get codePrepared() {
    return this.prepared;
  }

  public get outputHTML() {
    return this.output;
  }

  public updateData(updateType: string, newContent: string, id: number) {
    switch (updateType) {
      case "mode":
        this.data[id].mode = newContent;
        break;
      case "repeat":
        this.data[id].repeat = newContent;
        break;
      case "model":
        let modifiedContent = newContent.slice(0, -4);
        this.data[id].model = modifiedContent;
        break;
      case "sound":
        this.data[id].sound = newContent;
        break;
      case "video":
        this.data[id].video = newContent;
        break;
      case "image":
        this.data[id].image = newContent;
        break;
    }
  }

  public getBarcode(index: number) {
    return this.barcodes[index];
  }

  public prepareData() {
    for (let i = 0; i < this.getPatterns.length; i++) {
      this.data.push({
        pattern: this.patterns[i],
        barcode: `${this.barcodes[i]}`,
        mode: "image",
        model: "",
        sound: "",
        image: "",
        video: "",
        repeat: "false",
      });
    }
  }

  public compileData() {
    let patternNames = "";
    let barcodes = "";
    let modes = "";
    let modelFiles = "";
    let imageFiles = "";
    let videoFiles = "";
    let audioFiles = "";
    let repeatOptions = "";

    this.data.forEach((element, index) => {
      if (index !== this.data.length - 1) {
        patternNames += `\"${element.pattern}\" ,`;
        barcodes += `\"${element.barcode}\" ,`;
        modes += `\"${element.mode}\" ,`;
        modelFiles += `\"${element.model}\" ,`;
        imageFiles += `\"${element.image}\" ,`;
        videoFiles += `\"${element.video}\" ,`;
        audioFiles += `\"${element.sound}\" ,`;
        repeatOptions += `\"${element.repeat}\" ,`;
      } else {
        patternNames += `\"${element.pattern}\"`;
        barcodes += `\"${element.barcode}\"`;
        modes += `\"${element.mode}\"`;
        modelFiles += `\"${element.model}\"`;
        imageFiles += `\"${element.image}\"`;
        videoFiles += `\"${element.video}\"`;
        audioFiles += `\"${element.sound}\"`;
        repeatOptions += `\"${element.repeat}\"`;
      }
    });

    this.output +=
      patternNames +
      outputHTMLConfig[1] +
      barcodes +
      outputHTMLConfig[2] +
      modes +
      outputHTMLConfig[3] +
      modelFiles +
      outputHTMLConfig[4] +
      imageFiles +
      outputHTMLConfig[5] +
      videoFiles +
      outputHTMLConfig[6] +
      audioFiles +
      outputHTMLConfig[7] +
      repeatOptions +
      outputHTMLConfig[8] +
      `${this.getPatterns.length}` +
      outputHTMLConfig[9] +
      `${this.getPatterns.length}` +
      outputHTMLConfig[10];

    return this.output;
  }
}

const inputManager = new InputManager();
export default inputManager;
