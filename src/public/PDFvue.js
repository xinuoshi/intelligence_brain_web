// <script>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default{
    install(Vue, options) {
        Vue.prototype.getPdf = async function() {
            let title = this.htmlTitle;
            await html2Canvas(document.querySelector("#pdfDom"), {
                allowTaint: true
            }).then(function(canvas) {
                let contentWidth = canvas.width;
                let contentHeight = canvas.height;
                let pageHeight = contentWidth / 592.28 * 841.89;
                let leftHeight = contentHeight;
                let position = 0;
                let imgWidth = 595.28;
                let imgHeight = 592.28 / contentWidth * contentHeight;
                let pageData = canvas.toDataURL("image/jpeg", 1.0);
                let PDF = new JsPDF("", "pt", "a4");
                // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                // 当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        // 避免添加空白页
                        if (leftHeight > 0) {
                            PDF.addPage();
                        }
                    }
                }
                PDF.save(title + ".pdf");
            }
            );
        };
    }
};
// </script>