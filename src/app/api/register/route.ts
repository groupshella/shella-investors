import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      phone,
      amount,
      model,
      message,
      latitude,
      longitude,
      location,
      timestamp,
    } = body;

    const missing = [
      !fullName?.trim() && "fullName",
      !phone?.trim() && "phone",
      !amount && "amount",
      !model && "model",
      !latitude && "latitude",
      !longitude && "longitude",
      !location?.trim() && "location",
    ].filter(Boolean);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", fields: missing },
        { status: 400 },
      );
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      console.error("Missing Google Sheets env vars");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const formattedTime = new Date(timestamp ?? Date.now()).toLocaleString("ar-SA", {
      timeZone: "Asia/Riyadh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const modelLabel = model === "horizontal" ? "الأفقي" : "الرأسي";
    const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Partners!A:J",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            fullName,
            phone,
            location,
            amount,
            modelLabel,
            message ?? "",
            latitude,
            longitude,
            mapsUrl,
            formattedTime,
          ],
        ],
      },
    });

    return NextResponse.json({
      success: true,
      message: "تم إرسال طلب الشراكة بنجاح",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Sheets error:", message);

    if (message.includes("Unable to parse")) {
      return NextResponse.json(
        { error: "Invalid Google credentials format" },
        { status: 500 },
      );
    }

    if (message.includes("not found")) {
      return NextResponse.json(
        {
          error:
            "Google Sheet not found — make sure the sheet is shared with the service account",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to save. Please try again." },
      { status: 500 },
    );
  }
}
