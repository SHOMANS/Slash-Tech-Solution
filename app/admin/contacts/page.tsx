import { getContacts, toggleContactRead, deleteContact } from '@/lib/admin-crud'
import { ToggleSwitch } from '@/components/admin/toggle-switch'
import { DeleteButton } from '@/components/admin/delete-button'
import Link from 'next/link'

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const { contacts, total, pages, currentPage } = await getContacts(page, 10)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contact Messages ({total})
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Read
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {contacts.map((contact) => (
              <tr key={contact.id} className={!contact.read ? 'bg-blue-50 dark:bg-blue-950/20' : ''}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {contact.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {contact.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {contact.subject}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-md">
                    {contact.message}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ToggleSwitch
                    id={contact.id}
                    checked={contact.read}
                    action={toggleContactRead}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <DeleteButton id={contact.id} action={deleteContact} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/admin/contacts?page=${currentPage - 1}`}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Page {currentPage} of {pages}
          </span>
          {currentPage < pages && (
            <Link
              href={`/admin/contacts?page=${currentPage + 1}`}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
