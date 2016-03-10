'use strict';

import realm from './realm';

export const GokuDB = {
	saveBoard: (presolved, solved) => {
		console.log("saving Board");
		realm.write(() => {
			realm.create('Board', {
				presolved: presolved,
				solved: solved
			});
		});
	},

	getBoards: () => {
		console.log("gettings all Boards");
		console.log("gettings all Boards");
		return realm.objects('Board');
	}
}

export default GokuDB
