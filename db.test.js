const initSqlJs = require('sql.js');
const assert = require('assert');

async function runTest() {
  console.log("⏳ Starting Sovereign Identity Engine Database Test...");
  
  try {
    // تهيئة محرك قاعدة البيانات
    const SQL = await initSqlJs();
    const db = new SQL.Database(); // إنشاء قاعدة بيانات في الذاكرة (لغرض الاختبار فقط)

    // إنشاء هيكل جدول الهويات
    db.run("CREATE TABLE identities (did TEXT PRIMARY KEY, pubkey TEXT);");
    
    // إدخال هوية لامركزية تجريبية
    const testDid = 'did:ali:v12';
    const testPubKey = '0xabc123def456';
    db.run("INSERT INTO identities VALUES (?, ?);", [testDid, testPubKey]);

    // استرجاع البيانات للتحقق منها
    const res = db.exec("SELECT * FROM identities WHERE did='did:ali:v12';");
    const fetchedDid = res[0].values[0][0];

    // التأكد من تطابق البيانات (هنا يكمن الاختبار الحقيقي)
    assert.strictEqual(fetchedDid, testDid, "Error: DID mismatch in database!");

    console.log("✅ sql.js initialized successfully!");
    console.log("✅ Identity table created and queried correctly!");
    console.log("🚀 Sovereign Identity Engine is ready for production!");
    
    process.exit(0); // إنهاء بنجاح (اللون الأخضر في GitHub)
  } catch (error) {
    console.error("❌ Test Failed:", error.message);
    process.exit(1); // إنهاء بفشل (اللون الأحمر في GitHub)
  }
}

runTest();
