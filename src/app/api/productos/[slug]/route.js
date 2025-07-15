// app/api/productos/[slug]/route.js
import { connectDB } from '../../../../lib/mongodb';
import Producto from '../../../../models/product';

export async function GET(request, { params }) {
  await connectDB();
  const slug = params.slug;
  const formattedSlug = slug.replace(/_/g, ' ');
  
  console.log("Slug recibido:", slug);
  console.log("Buscando producto con nombre:", formattedSlug);

  const product = await Producto.findOne({ 
    nombre: { $regex: new RegExp(`^${formattedSlug}$`, 'i') }
  }).lean();

  if (!product) {
    return new Response(JSON.stringify({ error: 'Producto no encontrado' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
