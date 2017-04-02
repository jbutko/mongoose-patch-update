/*
 * Mongoose model update in patch like fashion
 * Copyright(c)2017 Jozef Butko <jbutko@gmail.com>
 * MIT License
 */

'use strict';

// public
module.exports = function(schema) {

	/**
	 * Patch like update of model instance
	 */
	schema.statics.patchUpdate = function patchUpdate(query, updateData, protectedKeys, selectedKeys, cb) {
		query = query || {};
		updateData = updateData || {};
		protectedKeys = protectedKeys || [];
		selectedKeys = selectedKeys || '';
		if (!Array.isArray(protectedKeys)) return 'protectedKeys must be of type array';

		return this
			.findOne(query)
			.select(selectedKeys)
			.exec()
			.then((modelInstance) => {
				if (!modelInstance) throw new Error('instanceNotFound');

				for (var attribute in updateData) {
					let isProtectedKey = protectedKeys.includes(attribute);
					let keyIsArray = Array.isArray(updateData[attribute]);
					let isObjectKey = typeof modelInstance[attribute] == 'object' && !keyIsArray;

					let keyIsUpdatable = updateData.hasOwnProperty(attribute) && attribute !== '_id' && !isProtectedKey && !isObjectKey;
					let isNestedKey = updateData.hasOwnProperty(attribute) && attribute !== '_id' && !isProtectedKey && isObjectKey;

					if (keyIsUpdatable)
						modelInstance[attribute] = updateData[attribute];
					else if (isNestedKey) {
						for (let nestedAttribute in updateData[attribute]) {
							let isProtectedNestedKey = protectedKeys.includes(`${attribute}.${nestedAttribute}`);
							if (!isProtectedNestedKey)
								modelInstance[attribute][nestedAttribute] = updateData[attribute][nestedAttribute];
						}
					}
				}

				if (cb) return modelInstance.save(cb);

				return modelInstance.save();
			})
			.catch((err) => {
				if (cb) return cb({ message: err, status: 400 }, null);
				return { message: err, status: 400 };
			});
	};
};
