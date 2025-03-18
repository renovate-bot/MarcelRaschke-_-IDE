using System;
using System.Collections.Generic;
$if$ ($targetframeworkversion$ >= 3.5)using System.Linq;
$endif$using System.Text;
$if$ ($targetframeworkversion$ >= 4.5)using System.Threading.Tasks;
$endif$using Microsoft.SCP;
using Microsoft.SCP.Topology;

namespace $safeprojectname$
{
    [Active(true)]
    class Program : TopologyDescriptor
    {
        static void Main(string[] args)
        {
        }

        public ITopologyBuilder GetTopologyBuilder()
        {
            TopologyBuilder topologyBuilder = new TopologyBuilder("$safeprojectname$" + DateTime.Now.ToString("yyyyMMddHHmmss"));
            topologyBuilder.SetSpout(
                "Spout",
                Spout.Get,
                new Dictionary<string, List<string>>()
                {
                    {Constants.DEFAULT_STREAM_ID, new List<string>(){"count"}}
                },
                1);
            topologyBuilder.SetBolt(
                "Bolt",
                Bolt.Get,
                new Dictionary<string, List<string>>(),
                1).shuffleGrouping("Spout");

            return topologyBuilder;
        }
    }
}

