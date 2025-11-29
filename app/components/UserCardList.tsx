'use client';

import { User } from '../types/user';
import Image from 'next/image';

interface UserCardListProps {
  users: User[];
  onDelete: (id: string) => void;
}

export default function UserCardList({ users, onDelete }: UserCardListProps) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-stone-50 dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <div className="flex items-start gap-4">
            <Image
              src={user.picture}
              alt={user.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-stone-900 dark:text-white mb-1">
                {user.name}
              </h3>
              <p className="text-sm text-stone-600 dark:text-gray-300 mb-1">
                {user.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {user.city}, {user.country}
              </p>
              <button
                onClick={() => {
                  if (confirm('Delete this user?')) {
                    onDelete(user.id);
                  }
                }}
                className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

