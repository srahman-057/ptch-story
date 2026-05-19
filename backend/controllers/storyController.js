import { neon } from '@neondatabase/serverless';
import { Redis } from '@upstash/redis'
import dotenv from "dotenv";

// Connection
dotenv.config();
const REDIS_URL = process.env.REDIS_REST_URL;
const REDIS_TOKEN = process.env.REDIS_REST_TOKEN;

let cachedData = null;

function redisConnect(){
    try{
        const tempRedis = new Redis({
        url: REDIS_URL,
        token: REDIS_TOKEN,
        })
        console.log("Redis Connected Successfully.");
        return tempRedis;
    }
    catch(error){
        console.log("Redis Connection Failed: ", error);
    }
}

function sqlConnect(){
    try{
        const tempSql = neon(process.env.DATABASE_URL);
        console.log("SQL Connected Successfully.");
        return tempSql;
    }
    catch(error){
        console.log("SQL Connection Failed: ", error);
    }
}

// READ
export const getStoryAll = async (req, res) => {
    
    const sql = sqlConnect();

    try{
        const queryResult = await sql.query(`
            SELECT id, title, date, image, category, short_content 
            FROM stories
            `);
        // console.log("Query Successful");
        res.status(200).json({ status: "success", data: queryResult});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ status: "Failure", data: "None" });
    }
};

export const getStorySingle = async (req, res) => {

    try{
        const {id} = req.params;
        const redis = redisConnect();
        cachedData = await redis.get(id);
        
        if(cachedData){
            console.log("Cache Hit for ID: ", id);
            //console.log("cachedData: ", cachedData[0].caption_strings);
            res.status(200).json({ status: "success", data: cachedData});
            return;
        }
        else{
            console.log("Cache Miss for ID: ", id);
            console.log("Connecting to SQL as fallback...");

            const sql = sqlConnect();

            const queryResult = await sql`
            SELECT id, title, date, image, category, content,content_images,image_strings,caption_strings
            FROM stories
            WHERE id=${id}
            `;
            res.status(200).json({ status: "success", data: queryResult});
            console.log("....Query successful, caching result for ID: ", id);

            await redis.set(id, JSON.stringify(queryResult));
            console.log("Query Result Cached for ID: ", id);
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({ status: "Failure", data: "None" });
    }    
};

export const getAllCategories = async (req, res) => {
    try{
        const sql = sqlConnect();
        const queryResult = await sql`
            SELECT *
            FROM categories
            `;

        // console.log("Query Successful");
        res.status(200).json({ status: "success", data: queryResult});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ status: "Failure", data: "None" });
    }    
};

// // Full CRUD functionality possible, but for security only READ allowed by default.

// // UPDATE
// export const updateStory = async (req, res) => {
//     try{
//         const {id} = req.params;
//         const {title, content} = req.body;

//         const queryResult = await sql`
//             UPDATE stories
//             SET title=${title}, content=${content}
//             WHERE id=${id}
//             RETURNING *
//             `;

//         console.log("Query Successful");
//         res.status(200).json({ status: "success", data: queryResult});
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({ status: "Failure", data: "None" });
//     }    
// };

// // DELETE
// export const deleteStory = async (req, res) => {
//     try{
//         const {id} = req.params;
//         const queryResult = await sql`
//             DELETE FROM stories
//             WHERE id=${id}
//             `;

//         console.log("Query Successful");
//         res.status(200).json({ status: "success", data: "deleted"});
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({ status: "Failure", data: "None" });
//     }    
// };