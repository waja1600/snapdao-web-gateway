
import React from 'react';
import { DashboardItem, DashboardItemProps } from './DashboardItem';

interface DashboardItemsProps {
  items: DashboardItemProps[];
}

export const DashboardItems: React.FC<DashboardItemsProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <DashboardItem key={index} {...item} />
      ))}
    </div>
  );
};
