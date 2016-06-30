using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;


namespace winform
{
    public partial class Login : Form
    {
        string sql = "server=.;   database=product;  uid=sa; pwd=123456";
        //声明一个数据集
        DataSet ds = new DataSet();  
        SqlConnection conn;
        public Login()
        {
            InitializeComponent();
            this.skinEngine1 = new Sunisoft.IrisSkin.SkinEngine(((System.ComponentModel.Component)(this)));
            this.skinEngine1.SkinFile = Application.StartupPath + "//CalmnessColor2.ssk";
            Sunisoft.IrisSkin.SkinEngine se = null;
            se = new Sunisoft.IrisSkin.SkinEngine();
            se.SkinAllForm = true;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                
                conn = new SqlConnection(sql);
                conn.Open();
                string s = "select * from Users where Name='" + textBox1.Text + "' and Pwd='" + textBox2.Text + "'";
                SqlCommand cmd = new SqlCommand(s, conn);
                
                //MessageBox.Show(conn.ToString());
                SqlDataReader sdr = cmd.ExecuteReader();
                bool r = sdr.Read();
                //MessageBox.Show(r.ToString());
                if (sdr.HasRows)
                {
                    this.Hide();
                    Main ma = new Main();
                    ma.Show();
                   
                }
                else
                {
                    MessageBox.Show("登陆失败！请重新输入用户与密码！", "提示信息", MessageBoxButtons.OKCancel, MessageBoxIcon.Stop);
                    textBox1.Text = "";
                    textBox2.Text = "";
                }
            }
            catch (Exception ex)
           {               
                MessageBox.Show(ex.ToString());     
            }         
            finally         
            {        ds.Clear();      
                     conn.Close();         
            }        
        }     
   private void btnExit_Click(object sender, EventArgs e)   
     {            this.Close();      
                
                
        }

        private void button3_Click(object sender, EventArgs e)
        {
            Register re=new Register();
            re.Show();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Login_Load(object sender, EventArgs e)
        {
            textBox2.PasswordChar = '*';
        }

        private void linkLabel1_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            Register re = new Register();
            re.Show();
        }

 
    }
}
