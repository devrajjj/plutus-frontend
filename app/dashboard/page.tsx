'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User } from '../types/user';
import UserTable from '../components/UserTable';
import UserCardList from '../components/UserCardList';
import FiltersBar from '../components/FiltersBar';

function DashboardContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const nameFilter = searchParams.get('name') || '';
  const cityFilter = searchParams.get('city') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=20')
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.results.map((u: any) => ({
          id: u.login.uuid,
          name: `${u.name.first} ${u.name.last}`,
          email: u.email,
          city: u.location.city,
          country: u.location.country,
          picture: u.picture.medium,
        }));
        setUsers(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateUrl = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    router.replace(`/dashboard?${newParams.toString()}`);
  };

  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const matchesName = !nameFilter || user.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesCity = !cityFilter || user.city.toLowerCase().includes(cityFilter.toLowerCase());
      return matchesName && matchesCity;
    });

    if (sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[sortBy as keyof User] as string;
        const bVal = b[sortBy as keyof User] as string;
        const comparison = aVal.localeCompare(bVal);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [users, nameFilter, cityFilter, sortBy, sortOrder]);

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      const newOrder = sortOrder === 'asc' ? 'desc' : '';
      updateUrl({ sortBy: newOrder ? column : '', sortOrder: newOrder });
    } else {
      updateUrl({ sortBy: column, sortOrder: 'asc' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-stone-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-gray-900">
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-3xl font-bold text-stone-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
        >
          User Dashboard
        </motion.h1>
        <FiltersBar
          nameFilter={nameFilter}
          cityFilter={cityFilter}
          onNameChange={(val) => updateUrl({ name: val })}
          onCityChange={(val) => updateUrl({ city: val })}
        />
        <div className="hidden md:block">
          <UserTable
            users={filteredUsers}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onDelete={handleDelete}
          />
        </div>
        <div className="md:hidden">
          <UserCardList users={filteredUsers} onDelete={handleDelete} />
        </div>
      </motion.div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-stone-600 dark:text-gray-400">Loading...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

