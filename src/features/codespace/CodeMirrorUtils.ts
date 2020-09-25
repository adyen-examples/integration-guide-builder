// import CodeMirror from "codemirror";

/* Scroll to given line, use this if selection attribute is not enough*/
// CodeMirror.defineExtension("centerOnLine", function (line: number) {
//   //@ts-ignore
//   var h = this.getScrollInfo().clientHeight;
//   //@ts-ignore
//   var coords = this.charCoords({ line: line, ch: 0 }, "local");
//   //@ts-ignore
//   this.scrollTo(null, (coords.top + coords.bottom - h) / 2);
// });

export function findCMMode(fileName: string | undefined): string {
  if (!fileName) return "";
  const parts = fileName.split(".");
  const ext = parts.length > 0 ? parts[parts.length - 1] : "";
  switch (ext) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    case "ts":
      return "text/typescript";
    case "jsx":
      return "text/jsx";
    case "tsx":
      return "text/typescript-jsx";
    case "vue":
      return "text/x-vue";
    case "java":
      return "text/x-java";
    case "kt":
      return "text/x-kotlin";
    case "cs":
      return "text/x-csharp";
    case "cshtml":
      return "text/x-aspx";
    case "go":
      return "text/x-go";
    case "php":
      return "text/x-php";
    case "py":
      return "text/x-python";
    case "rb":
      return "text/x-ruby";
    case "swift":
      return "text/x-swift";
    default:
      return "";
  }
}
