import fitz  # PyMuPDF
import docx
from fastapi import UploadFile


def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text("text")
    return text


def extract_text_from_docx(file_path: str) -> str:
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])


def extract_text(file: UploadFile, file_path: str) -> str:
    """Save uploaded file and extract text"""
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    if file.filename.endswith(".pdf"):
        return extract_text_from_pdf(file_path)
    elif file.filename.endswith(".docx"):
        return extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file type")


def analyze_tender_text(text: str) -> dict:
    """
    Basic extractor (replace with AI later).
    """
    summary = text[:500] + "..." if len(text) > 500 else text

    deadlines = [line for line in text.split("\n") if "deadline" in line.lower()]
    budget = [line for line in text.split("\n") if "budget" in line.lower() or "amount" in line.lower()]
    buyer = [line for line in text.split("\n") if "buyer" in line.lower() or "department" in line.lower()]

    return {
        "summary": summary.strip(),
        "key_deadlines": deadlines[:3],
        "budget_highlights": budget[:3],
        "buyer_details": buyer[:3],
    }
