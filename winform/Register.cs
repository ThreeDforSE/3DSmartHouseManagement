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
    public partial class Register : Form
    {
        string sql = "server=.;   database=product;  uid=sa; pwd=123456";
        SqlConnection conn;
        
        public Register()
        {
            InitializeComponent();
            this.skinEngine1 = new Sunisoft.IrisSkin.SkinEngine(((System.ComponentModel.Component)(this)));
            this.skinEngine1.SkinFile = Application.StartupPath + "//CalmnessColor2.ssk";
            Sunisoft.IrisSkin.SkinEngine se = null;
            se = new Sunisoft.IrisSkin.SkinEngine();
            se.SkinAllForm = true;
        }

        private void Register_Load(object sender, EventArgs e)
        {
            DialogResult dr = MessageBox.Show("是否同意服务条款(Y/N)","提示",MessageBoxButtons.YesNo,MessageBoxIcon.Information);
            if (dr == DialogResult.No)
            {
                this.Close();
            }
            textBox2.PasswordChar = '*';
            textBox3.PasswordChar = '*';
        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                conn = new SqlConnection(sql);
                string cmd = "INSERT INTO Users VALUES('" + textBox1.Text + "','" + textBox2.Text + "')";
                SqlCommand com = new SqlCommand(cmd, conn);
                conn.Open();
                if (textBox2.Text != textBox3.Text)
                {
                    MessageBox.Show("请确认密码。");
                    textBox2.Text = "";
                    textBox3.Text = "";
                }
                else if (com.ExecuteNonQuery() != 0 && textBox2.Text == textBox3.Text)//com.ExecuteNonQuery()执行语句，并返回受影响行数
                {
                    MessageBox.Show("注册成功！");
                    this.Close();
                }
                else
                {
                    MessageBox.Show("注册不成功！");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString());
            }
            finally
            {
                conn.Close();
            }  
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
