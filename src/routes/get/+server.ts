export async function GET() {
	const url = 'https://raw.githubusercontent.com/PecinhasFPS/Pecinhas-V2/main/get.ps1';
	
	try {
		const res = await fetch(url);
		if (!res.ok) return new Response('File not found', { status: 404 });
		
		const text = await res.text();
		const encoder = new TextEncoder();
		const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 BOM
		const encoded = encoder.encode(text);

		// Prepend BOM
		const fileData = new Uint8Array(bom.length + encoded.length);
		fileData.set(bom, 0);
		fileData.set(encoded, bom.length);

		return new Response(fileData, {
			headers: {
				'Content-Type': 'text/plain; charset=UTF-8',
				'Content-Disposition': 'attachment; filename="get.ps1"',
				'Cache-Control': 'public, max-age=300'
			}
		});
	} catch (error) {
		return new Response('Error fetching script', { status: 500 });
	}
}