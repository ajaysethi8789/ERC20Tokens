module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
            test: {
            host: "122.2.2.2",
            port: 8545,
            network_id: "" // Match any network id
        }

    }

};
