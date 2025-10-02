import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).send("No PDF URL provided");

    const response = await fetch(url);
    if (!response.ok) return res.status(404).send("File not found");

    const urlParts = url.split("?")[0].split("/");
    const filename = decodeURIComponent(urlParts[urlParts.length - 1]);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Pipe the remote response directly to the client
    response.body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Download failed");
  }
}
