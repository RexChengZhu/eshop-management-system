import { Breadcrumb } from 'antd';
import React, { useState } from 'react';

interface CategoryListProps {
  click: (item: { id: number, title: string }) => void
  selectedList:{ id: number, title: string }[]
}

const CategoryList = ({ click,selectedList }: CategoryListProps) => {


  return (
    <Breadcrumb>
      {
        selectedList?.map(item => {
          return (
            <Breadcrumb.Item key={item.id}>
              <a href='javascript:;' onClick={() => {
                while (true) {
                  // 从数组最后开始pop
                  const pop = selectedList.pop();
                  if (pop?.id === item.id) {
                    selectedList.push(pop);
                    click({ id: item.id, title: item.title });
                    break;
                  }
                }

              }}>{item.title}</a>
            </Breadcrumb.Item>
          );
        })
      }
    </Breadcrumb>
  );
};
export default CategoryList;
