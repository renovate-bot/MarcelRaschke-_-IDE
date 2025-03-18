using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading;
using Microsoft.SCP;
using Microsoft.SCP.Rpc.Generated;

namespace $rootnamespace$
{
    public class $itemname$: ISCPTxSpout
    {
        public void NextTx(out long seqId, Dictionary<string, Object> parms)
        {
            throw new NotImplementedException();
        }

        public void Ack(long seqId, Dictionary<string, Object> parms)
        {
         
        }

        public void Fail(long seqId, Dictionary<string, Object> parms)
        {
           
        }
    }
}