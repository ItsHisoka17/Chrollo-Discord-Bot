const sql = require('quick.db');

class MySQL{
    static deleteData(data){
        sql.delete(data)
    }
    static addToBal(guild, user, amount, ID){
    sql.add(`${ID}_${guild.id}_${user.id}`, amount)        
    }
    static mapData(data){
        let mainInfo = 
        sql.all()
        .filter(info => info.ID === data)
        .map(res => {
            `${res.ID} | ${res.data}`
        })
        return mainInfo;
    }
    static createLeaderBoard(data, client, {limit = 10}){
        let leaderBoard = sql.all()
        .filter(info => info.ID === data)
        .sort((a, b) => b.data = a.data);
        leaderBoard.length = limit;
        let res;
        for (let i in leaderBoard){
            res = `**${client.users.cache.get(leaderBoard[i].ID.slice(24)).username}** - ${leaderBoard[i].data!==null?leaderBoard[i].data:0}`
        }
        return res;
    }
    static deleteAllData(guild){
        return new Promise((resolve, reject) => {
        if (!guild || typeof guild !== 'object') reject(new Error('Guild Not found'))
        this.deleteData(`prefix_${guild.id}`)
        this.deleteData(`toggleCh_${guild.id}`)
        this.deleteData(`welcoming_${guild.id}`)
        this.deleteData(`sch_${guild.id}`)
        this.deleteData(`confess_${guild.id}`)
        this.deleteData(`confessCh_${guild.id}`)
        this.deleteData(`nsfw_${guild.id}`)
        guild.members.cache.forEach((m) => {
            this.deleteData(`balance_${guild.id}_${m.user.id}`)
            this.deleteData(`bank_${guild.id}_${m.user.id}`)
        })
        resolve()
        })
    }
}

module.exports = MySQL;