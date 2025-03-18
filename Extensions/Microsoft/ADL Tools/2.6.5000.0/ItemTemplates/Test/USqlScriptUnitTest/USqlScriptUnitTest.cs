//------------------------------------------------------------------------------
// IMPORTANT:
//   Please disable Shadow Copy if you are using NUnit.
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Analytics.ScriptUnitTest;

namespace $rootnamespace$
{
    [TestClass()]
    public class $safeitemname$
    {
        public $safeitemname$()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        [TestMethod()]
        public void TestMethod1()
        {
            // uSqlProjectOutputRelativePath is set to the relative path of the build output from the original U-SQL project.
            // cppSdkFolderFullPath is set to the full path of CPPSDK folder.
            //   If the value of cppSdkFolderFullPath is empty, environment variable SCOPE_CPP_SDK or the one installed with ADL Tools for Visual Studio will be used.
            //   Please refer to https://go.microsoft.com/fwlink/?linkid=874080 to learn more about CPPSDK.
            USqlScriptTestRunner testRunner = new USqlScriptTestRunner(uSqlProjectOutputRelativePath: @"", cppSdkFolderFullPath: @"");
            // Test data and databases will be deployed locally.
            testRunner.Initialize();
            // scriptFileRelativePath is set to the relative path of the script to be tested. The script is included in the build output from the original U-SQL project.
            USqlScriptTestResult testResult = testRunner.Run(scriptFileRelativePath: @"");
            // testResult.ErrorMessage includes error details if the test case fails.
            Assert.IsTrue(testResult.IsSuccessful, testResult.ErrorMessage);
        }

        #region Additional test attributes
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Use TestInitialize to run code before running each test 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion

        /// <summary>
        /// Gets or sets the test context which provides information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        private TestContext testContextInstance;
    }
}
