using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dto;
using WebApplication1.Repository.IRepository;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using WebApplication1.Services;
using Microsoft.AspNetCore.Authorization;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class PrintPDFController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public PrintPDFController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("GeneratePdf/{InvoiceNumber:int}")]
        //add package Polybioz.HtmlRenderer.PdfSharp.Core --version 1.0.0
        //GENERATE VIEW THIS METHOD, CLICK R=DERECHO SOBRE GENERATE, ADD VIEW
        public async Task<IActionResult> Generate(int InvoiceNumber)
        {
            OrderVM orderVM = new()
            {
                OrderHeader = _unitOfWork.OrderHeaderRepository.GetFirstOrDefault(x => x.Id == InvoiceNumber),
                OrderDetails = _unitOfWork.OrderDetailsRepository.GetAll(x => x.OrderId == InvoiceNumber, x => x.Product)
            };



            var document = new PdfDocument();

            //generated two copies
            //string[] copies = { "Customer copy", "Company Copy" };
            //for (int i = 0; i < copies.Length; i++)
            //{
            //    string htmlcontent = await this.RenderViewAsync("HtmlPdf", orderVM);
            //    PdfGenerator.AddPdfPages(document, htmlcontent, PageSize.A4);
            //}

            string htmlcontent = await this.RenderViewAsync("HtmlPdf", orderVM);
            PdfGenerator.AddPdfPages(document, htmlcontent, PageSize.A4);

            byte[]? response = null;
            using (MemoryStream ms = new())
            {
                document.Save(ms);
                response = ms.ToArray();
            }
            string Filename = "Invoice_" + InvoiceNumber + ".pdf";

            return File(response, "application/pdf", Filename);
        }
    }
}
