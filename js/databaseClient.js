const GROUP_NAME = "al5";
const PASSWORD = "nglx0k6sczenwcqo";

const SERVER_URL = "https://ict-290.herokuapp.com/sql";

const databaseClient = {
  executeSqlQuery: async (sql) => {
    const payload = {
      group: GROUP_NAME,
      pw: PASSWORD,
      sql: sql,
    };
    try {
      const response = await fetch(SERVER_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.error) {
        console.error("SQL Fehler:", result.error);
      }
      return result;
    } catch (error) {
      console.error("DB Fehler:", error);
    }
  },

  insertInto: async (sqlTable, formData) => {
    let result = null;
    const fields = Object.keys(formData);
    const values = Object.values(formData).map((val) =>
      val.replace(/'/g, "''")
    );

    const sql = `INSERT INTO ${sqlTable} (${fields.join(
      ","
    )}) VALUES ('${values.join("','")}')`;
    try {
      result = await databaseClient.executeSqlQuery(sql);
    } catch (error) {
      console.error("Fehler bei insertInto:", error);
    }
    return result;
  },

  selectWhere: async (table, field, value) => {
    const safeValue = value.replace(/'/g, "''");
    const sql = `SELECT * FROM ${table} WHERE ${field} = '${safeValue}'`;
    try {
      const result = await databaseClient.executeSqlQuery(sql);
      return result[1] || [];
    } catch (error) {
      console.error("Fehler bei selectWhere:", error);
      return [];
    }
  },
};

// Beispiel: Einfügen von Formulardaten in scentandflames_user
const sendKontaktformular = async () => {
  const formData = {
    vorname: document.getElementById("vorname").value.trim(),
    nachname: document.getElementById("nachname").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefon: document.getElementById("telefon").value.trim(),
    bemerkung: document.getElementById("bemerkung").value.trim(),
  };

  const result = await databaseClient.insertInto(
    "scentandflames_user",
    formData
  );
  console.log("Insert-Ergebnis:", result);
};
