'use strict';

import Realm from 'realm';

class Board{}
Board.schema = {
	name: 'Board',
	properties: {
		presolved: Realm.Types.STRING,
		solved: Realm.Types.STRING,
	},
};

export default new Realm({schema: [Board]});
