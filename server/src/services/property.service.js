import { propertyRepository } from '../repositories/property.repository.js';
import { conflict, notFound } from '../utils/app-error.js';

export const propertyService = {
  list(filters) {
    return propertyRepository.list(filters);
  },

  async get(id) {
    const property = await propertyRepository.findById(id);
    if (!property) throw notFound('Property');
    return property;
  },

  create(input) {
    return propertyRepository.create(input);
  },

  async update(id, input) {
    const updated = await propertyRepository.update(id, input);
    if (!updated) throw notFound('Property');
    return updated;
  },

  async remove(id) {
    const property = await propertyRepository.findById(id);
    if (!property) throw notFound('Property');
    if (property.status === 'Sold') {
      throw conflict(
        'Sold properties cannot be deleted because their sale history must be retained',
      );
    }
    await propertyRepository.remove(id);
  },
};
