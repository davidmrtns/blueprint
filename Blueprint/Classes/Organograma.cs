using MySql.Data.MySqlClient;
using System.Text.Json;
using System;
using System.Runtime.CompilerServices;

namespace Blueprint.Classes
{
    public class Organograma
    {
        public class Node
        {
            public string id { get; set; }
            public string type { get; set; }
            public dynamic data { get; set; }
            public dynamic position { get; set; }
        }

        public class Edge
        {
            public string id { get; set; }
            public string source { get; set; }
            public string target { get; set; }
            public string type { get; set; }
        }

        public class GraphData
        {
            public List<Node> nodes { get; set; }
            public List<Edge> edges { get; set; }
        }

        /*public static string GerarOrganograma()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            var nodes = new List<Node>();
            var edges = new List<Edge>();

            int nodeIndex = 0;
            int xOffset = 0;
            int yOffset = 0;
            int horizontalSpacing = 100;
            int verticalSpacing = 100;

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT numero, cargo FROM atribuicao", con);
                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        string numero = leitor["numero"].ToString();
                        string cargo = leitor["cargo"].ToString();

                        int xPos = xOffset + (nodeIndex * horizontalSpacing);
                        int yPos = yOffset + (nodeIndex * verticalSpacing);

                        nodes.Add(new Node { 
                            id = numero,
                            type = "default",
                            data = new { label = cargo},
                            position = new { x = xPos, y = yPos}
                        });

                        nodeIndex++;
                    }
                }

                con.Close();

                con.Open();

                query = new MySqlCommand("SELECT subordinado, superior FROM subordinacao", con);
                leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        string subordinado = leitor["subordinado"].ToString();
                        string superior = leitor["superior"].ToString();

                        edges.Add(new Edge
                        {
                            id = $"{superior}-{subordinado}",
                            source = superior,
                            target = subordinado,
                            type = "smoothstep"
                        });
                    }
                }

                con.Close();

                var organograma = new GraphData
                {
                    nodes = nodes,
                    edges = edges
                };

                return JsonSerializer.Serialize(organograma);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }*/
        public static bool IsParent(Node anterior, string atual, List<Edge> edges)
        {
            if (edges.Any(e => e.source == anterior.id && e.target == atual))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool IsParent(string anterior, Node atual, List<Edge> edges)
        {
            if (edges.Any(e => e.source == anterior && e.target == atual.id))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool hasParent(string numero, List<Edge> edges)
        {
            if (edges.Any(e => e.target == numero))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static Node findParent(Node temporario, List<Edge> edges, List<Node> nodes)
        {
            Node node = null;
            Edge edge = edges.Find(e => e.target == temporario.id);
            if (edge != null)
            {
                node = nodes.Find(n => n.id == edge.source);
            }
            else
            {
                node = null;
            }

            return node;
        }

        public static string GerarOrganograma()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);
            var nodes = new List<Node>();
            var temporaryNodes = new List<Node>();
            var edges = new List<Edge>();

            int nodeIndex = 0;
            int xOffset = 0;
            int yOffset = 0;
            int horizontalSpacing = 100;
            int verticalSpacing = 100;

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT subordinado, superior FROM subordinacao", con);
                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        string subordinado = leitor["subordinado"].ToString();
                        string superior = leitor["superior"].ToString();

                        edges.Add(new Edge
                        {
                            id = $"{superior}-{subordinado}",
                            source = superior,
                            target = subordinado,
                            type = "smoothstep"
                        });
                    }
                }

                con.Close();

                con.Open();

                query = new MySqlCommand("SELECT numero, cargo FROM atribuicao", con);
                leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        string numero = leitor["numero"].ToString();
                        string cargo = leitor["cargo"].ToString();

                        if (nodeIndex == 0)
                        {
                            nodes.Add(new Node
                            {
                                id = numero,
                                type = "default",
                                data = new { label = cargo },
                                position = new { x = 0, y = 0 }
                            });

                            nodeIndex++;
                        }
                        else if (nodes.Count > 0)
                        {
                            if (!hasParent(numero, edges))
                            {
                                nodes.Add(new Node
                                {
                                    id = numero,
                                    type = "default",
                                    data = new { label = cargo },
                                    position = new { x = 100, y = 0 }
                                });

                                nodeIndex++;
                            }
                            else if (IsParent(nodes[nodeIndex - 1], numero, edges))
                            {
                                int x = nodes[nodeIndex - 1].position.x;
                                int y = nodes[nodeIndex - 1].position.y + 100;
                                nodes.Add(new Node
                                {
                                    id = numero,
                                    type = "default",
                                    data = new { label = cargo },
                                    position = new { x = x, y = y }
                                });

                                nodeIndex++;
                            }
                            else
                            {
                                temporaryNodes.Add(new Node
                                {
                                    id = numero,
                                    type = "default",
                                    data = new { label = cargo }
                                });
                            }
                        }
                    }
                }

                con.Close();

                if (temporaryNodes.Count > 0)
                {
                    foreach (Node node in temporaryNodes)
                    {
                        Node parent = findParent(node, edges, nodes);

                        if (parent != null)
                        {
                            int x = parent.position.x;
                            int y = parent.position.y + 100;
                            nodes.Add(new Node
                            {
                                id = node.id,
                                type = "default",
                                data = new { label = node.data.label },
                                position = new { x = x, y = y }
                            });

                            nodeIndex++;
                        }
                    }
                }

                var organograma = new GraphData
                {
                    nodes = nodes,
                    edges = edges
                };

                return JsonSerializer.Serialize(organograma);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}
