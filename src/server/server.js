// node.js server

const http = require('http');
const axios = require('axios');

const requestListener = (req, res) => {
	const { url, data } = req;

	// GET endpoint
	if (url === '/api/supervisors') {
		console.log("/api/supervisors called");

		const url = 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers';
		axios.get(url)
			.then(response => {
				const supervisorList = [];
				for (let key in response.data) {
					const sup = response.data[key];
					
					// exclude numeric jurisdictions
					const pattern = /^[A-Za-z]+$/;
					if (pattern.test(sup.jurisdiction)) {
						supervisorList.push({
							jurisdiction:	sup.jurisdiction,
							lastName: sup.lastName, 
							firstName: sup.firstName
						});
					}
				}

				// sort supervisor list in alphabetical order by jurisdiction, then lastName, then firstName
				supervisorList.sort((a, b) => {
					const [jurisdictionA, jurisdictionB] = [a.jurisdiction, b.jurisdiction];
					const [lastNameA, lastNameB] = [a.lastName.toLowerCase(), b.lastName.toLowerCase()];
					const [firstNameA, firstNameB] = [a.firstName.toLowerCase(), b.firstName.toLowerCase()];

					// sort by jurisdiction
					if (jurisdictionA < jurisdictionB) { return -1 }
					else if (jurisdictionA > jurisdictionB) { return 1 }
					else {
						// sort by lastName
						if (lastNameA < lastNameB) { return -1 }
						else if (lastNameA > lastNameB) { return 1 }
						else {
							//sort by firstName
							if (firstNameA < firstNameB) { return -1 }
							else if (firstNameA > firstNameB) { return 1 }
						}
					}
					
					return 0;
				});

				// return list of strings in the following format
				//   jurisdiction - lastName, firstName
				res.writeHead(200);
				for (let key in supervisorList) {
					const sup = supervisorList[key];
					res.write(sup.jurisdiction + " - " + sup.lastName + ", " + sup.firstName + "\n");
				}
				res.end();
			})
			.catch(err => console.log(err))
	}

	// POST endpoint
	if (url === '/api/submit') {
		console.log("/api/submit called");

		if (data) {
			console.log(data);

			// trigger error if no firstName, lastName or supervisor
			if (!data.firstName || !data.lastName || !data.supervisor) {
				res.writeHead(400);
				res.write('Error: Missing first name, last name or supervisor field.');
				res.end();
			}
			else {
				res.writeHead(200);
				res.end();
			}
		}
		else {
			res.writeHead(400);
			res.end();
		}
	}
};

const server = http.createServer(requestListener);
const port = 8080;
server.listen(port, (err) => {
	if (err) { throw err }
});