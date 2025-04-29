import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('coverImage') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const filename = file.name.replace(/\s+/g, '_'); // Replace spaces with underscores for filename safety
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Create the upload directory if it doesn't exist
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, uint8Array); // Write the Uint8Array directly

    console.log('File saved successfully:', filePath);

    // Return the path relative to the public directory
    const relativeFilePath = path.join('/uploads', filename);

    return NextResponse.json({ message: 'File uploaded successfully', filename: relativeFilePath });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json({ message: 'Error processing file upload' }, { status: 500 });
  }
}
