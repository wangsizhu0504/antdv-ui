import type { Key } from '@antdv/types';
import type { ShallowRef } from 'vue';
import type { BasicDataNode, DataEntity, DataNode } from './interface';
import { ref, shallowRef, watchEffect } from 'vue';

export default function useMaxLevel<TreeDataType extends BasicDataNode = DataNode>(
  keyEntities: ShallowRef<Record<Key, DataEntity<TreeDataType>>>,
) {
  const maxLevel = ref(0);
  const levelEntities = shallowRef<Map<number, Set<DataEntity<TreeDataType>>>>();
  watchEffect(() => {
    const newLevelEntities = new Map<number, Set<DataEntity<TreeDataType>>>();
    let newMaxLevel = 0;
    const keyEntitiesValue = keyEntities.value || {};
    // Convert entities by level for calculation
    for (const key in keyEntitiesValue) {
      if (Object.prototype.hasOwnProperty.call(keyEntitiesValue, key)) {
        const entity = keyEntitiesValue[key];
        const { level } = entity;

        let levelSet: Set<DataEntity<TreeDataType>> = newLevelEntities.get(level);
        if (!levelSet) {
          levelSet = new Set();
          newLevelEntities.set(level, levelSet);
        }

        levelSet.add(entity);

        newMaxLevel = Math.max(newMaxLevel, level);
      }
    }
    maxLevel.value = newMaxLevel;
    levelEntities.value = newLevelEntities;
  });
  return {
    maxLevel,
    levelEntities,
  };
}
