import Link from 'next/link'
import { getProducts } from '@/lib/admin-crud'
import { ToggleSwitch } from '@/components/admin/toggle-switch'
import { DeleteButton } from '@/components/admin/delete-button'
import { toggleProductActive, toggleProductFeatured, deleteProduct } from '@/lib/admin-crud'

export default async function ProductsAdminPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams.page) || 1
  const { products, total, pages } = await getProducts(currentPage, 10)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products Management</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Features</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{product.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {product.price || 'Contact for pricing'}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.features.slice(0, 2).join(', ')}
                    {product.features.length > 2 && '...'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ToggleSwitch
                    id={product.id}
                    checked={product.featured}
                    action={toggleProductFeatured}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ToggleSwitch
                    id={product.id}
                    checked={product.active}
                    action={toggleProductActive}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={product.id} action={deleteProduct} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/admin/products?page=${page}`}
              className={`px-4 py-2 rounded ${page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Total: {total} products
      </div>
    </div>
  )
}
