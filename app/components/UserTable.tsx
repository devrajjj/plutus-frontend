'use client';

import { User } from '../types/user';
import Image from 'next/image';

interface UserTableProps {
  users: User[];
  sortBy: string;
  sortOrder: string;
  onSort: (column: string) => void;
  onDelete: (id: string) => void;
}

export default function UserTable({
  users,
  sortBy,
  sortOrder,
  onSort,
  onDelete,
}: UserTableProps) {
  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return null;
    return <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="overflow-x-auto bg-stone-50 dark:bg-gray-800 rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-stone-100 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 dark:text-gray-300 uppercase tracking-wider">
              Photo
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-stone-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-stone-200 dark:hover:bg-gray-600"
              onClick={() => onSort('name')}
            >
              Name <SortIcon column="name" />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-stone-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-stone-200 dark:hover:bg-gray-600"
              onClick={() => onSort('email')}
            >
              Email <SortIcon column="email" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 dark:text-gray-300 uppercase tracking-wider">
              City
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-stone-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-stone-200 dark:hover:bg-gray-600"
              onClick={() => onSort('country')}
            >
              Country <SortIcon column="country" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-stone-700 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-stone-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900 dark:text-white">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600 dark:text-gray-300">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {user.city}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {user.country}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => {
                    if (confirm('Delete this user?')) {
                      onDelete(user.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

